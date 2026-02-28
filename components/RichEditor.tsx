'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Image as TiptapImage } from '@tiptap/extension-image';
import { Link as TiptapLink } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Underline } from '@tiptap/extension-underline';
import { useCallback, useRef, useState, useEffect, forwardRef } from 'react';
import type { Editor, JSONContent } from '@tiptap/react';

interface RichEditorProps {
  content?: JSONContent;
  onChange?: (json: JSONContent) => void;
  placeholder?: string;
  editable?: boolean;
}

interface ActiveUpload {
  id: string;
  fileName: string;
  isImage: boolean;
  progress: number;
  localUrl: string | null;
  status: 'uploading' | 'done' | 'error';
}

function uploadFileWithProgress(
  file: File,
  onProgress: (pct: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `/api/upload?filename=${encodeURIComponent(file.name)}`);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data.url);
        } catch { reject(new Error('Invalid response')); }
      } else {
        reject(new Error('Upload failed'));
      }
    };
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.send(file);
  });
}

export function RichEditor({
  content,
  onChange,
  placeholder = 'Describe the workflow you want automated...',
  editable = true,
}: RichEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor | null>(null);
  const [uploads, setUploads] = useState<ActiveUpload[]>([]);

  const startUpload = useCallback((file: File, ed: Editor) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const isImage = file.type.startsWith('image/');
    const localUrl = isImage ? URL.createObjectURL(file) : null;

    if (isImage && localUrl) {
      ed.chain().focus().setImage({ src: localUrl, alt: file.name }).run();
    } else {
      ed.chain().focus()
        .insertContent([
          { type: 'paragraph', content: [{ type: 'text', text: file.name, marks: [{ type: 'link', attrs: { href: `#pending-${id}`, target: '_blank' } }] }] },
          { type: 'paragraph' },
        ])
        .run();
    }

    setUploads((prev) => [...prev, { id, fileName: file.name, isImage, progress: 0, localUrl, status: 'uploading' }]);

    uploadFileWithProgress(file, (pct) => {
      setUploads((prev) => prev.map((u) => u.id === id ? { ...u, progress: pct } : u));
    })
      .then((url) => {
        setUploads((prev) => prev.map((u) => u.id === id ? { ...u, progress: 100, status: 'done' } : u));

        if (isImage && localUrl) {
          const { tr } = ed.state;
          let found = false;
          ed.state.doc.descendants((node, pos) => {
            if (!found && node.type.name === 'image' && node.attrs.src === localUrl) {
              tr.setNodeMarkup(pos, undefined, { ...node.attrs, src: url });
              found = true;
              return false;
            }
          });
          if (found) ed.view.dispatch(tr);
          URL.revokeObjectURL(localUrl);
        } else {
          const pendingHref = `#pending-${id}`;
          const { tr } = ed.state;
          let found = false;
          ed.state.doc.descendants((node, pos) => {
            if (found) return false;
            if (node.isText) {
              const linkMark = node.marks.find((m) => m.type.name === 'link' && m.attrs.href === pendingHref);
              if (linkMark) {
                const from = pos;
                const to = pos + node.nodeSize;
                tr.removeMark(from, to, linkMark.type);
                tr.addMark(from, to, linkMark.type.create({ href: url, target: '_blank' }));
                found = true;
                return false;
              }
            }
          });
          if (found) ed.view.dispatch(tr);
        }

        setTimeout(() => setUploads((prev) => prev.filter((u) => u.id !== id)), 600);
      })
      .catch(() => {
        setUploads((prev) => prev.map((u) => u.id === id ? { ...u, status: 'error' } : u));

        if (isImage && localUrl) {
          const { tr } = ed.state;
          let found = false;
          ed.state.doc.descendants((node, pos) => {
            if (!found && node.type.name === 'image' && node.attrs.src === localUrl) {
              tr.delete(pos, pos + node.nodeSize);
              found = true;
              return false;
            }
          });
          if (found) ed.view.dispatch(tr);
          URL.revokeObjectURL(localUrl);
        } else {
          const pendingHref = `#pending-${id}`;
          const { tr } = ed.state;
          let found = false;
          ed.state.doc.descendants((node, pos) => {
            if (found) return false;
            if (node.isText) {
              const linkMark = node.marks.find((m) => m.type.name === 'link' && m.attrs.href === pendingHref);
              if (linkMark) {
                tr.delete(pos, pos + node.nodeSize);
                found = true;
                return false;
              }
            }
          });
          if (found) ed.view.dispatch(tr);
        }
      });
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TiptapImage.configure({ inline: false, allowBase64: false }),
      TiptapLink.configure({ openOnClick: !editable, autolink: true }),
      Underline,
      Placeholder.configure({ placeholder }),
    ],
    content: content || undefined,
    editable,
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content',
      },
      handleClick(_view, _pos, event) {
        if (!editable) return false;
        const target = event.target as HTMLElement;
        const anchor = target.closest('a');
        if (anchor) {
          event.preventDefault();
          return true;
        }
        return false;
      },
      handleDrop(_view, event) {
        if (!editable || !editorRef.current) return false;
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          event.preventDefault();
          Array.from(files).forEach((f) => startUpload(f, editorRef.current!));
          return true;
        }
        return false;
      },
      handlePaste(_view, event) {
        if (!editable || !editorRef.current) return false;
        const items = event.clipboardData?.items;
        if (!items) return false;
        for (const item of Array.from(items)) {
          if (item.kind === 'file') {
            const file = item.getAsFile();
            if (file) {
              event.preventDefault();
              startUpload(file, editorRef.current!);
              return true;
            }
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange?.(ed.getJSON());
    },
    onCreate: ({ editor: ed }) => {
      editorRef.current = ed;
    },
  });

  const handleToolbarFileClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || !editor) return;
      Array.from(files).forEach((f) => startUpload(f, editor));
      e.target.value = '';
    },
    [editor, startUpload]
  );

  if (!editor) return null;

  return (
    <div className={`rich-editor-wrapper${editable ? '' : ' readonly'}`}>
      {editable && (
        <>
          <Toolbar editor={editor} onFileClick={handleToolbarFileClick} />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf,.zip,.doc,.docx,.xls,.xlsx,.csv,.txt"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </>
      )}
      <UploadProgressBar uploads={uploads} />
      <EditorContent editor={editor} />
      {editable && <LinkBubbleMenu editor={editor} />}
    </div>
  );
}

function UploadProgressBar({ uploads }: { uploads: ActiveUpload[] }) {
  const active = uploads.filter((u) => u.status === 'uploading');
  if (active.length === 0) return null;
  const avg = Math.round(active.reduce((sum, u) => sum + u.progress, 0) / active.length);
  return (
    <div style={{ height: 3, backgroundColor: '#e5e7eb', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${avg}%`, backgroundColor: 'var(--accent, #fe0534)', transition: 'width 0.15s ease', borderRadius: '0 2px 2px 0' }} />
    </div>
  );
}

function Toolbar({ editor, onFileClick }: { editor: Editor; onFileClick: () => void }) {
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const linkBtnRef = useRef<HTMLButtonElement>(null);
  const linkPopoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!linkPopoverOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        linkPopoverRef.current &&
        !linkPopoverRef.current.contains(e.target as Node) &&
        linkBtnRef.current &&
        !linkBtnRef.current.contains(e.target as Node)
      ) {
        setLinkPopoverOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [linkPopoverOpen]);

  function handleLinkSubmit() {
    if (linkUrl.trim()) {
      const href = linkUrl.match(/^https?:\/\//) ? linkUrl : `https://${linkUrl}`;
      editor.chain().focus().setLink({ href }).run();
    }
    setLinkUrl('');
    setLinkPopoverOpen(false);
  }

  return (
    <div className="editor-toolbar">
      <ToolBtn
        active={editor.isActive('heading', { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        label="H1"
      />
      <ToolBtn
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        label="H2"
      />
      <ToolBtn
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        label="H3"
      />
      <Sep />
      <ToolBtn
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        label={<span style={{ fontWeight: 700 }}>B</span>}
      />
      <ToolBtn
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        label={<span style={{ fontStyle: 'italic' }}>I</span>}
      />
      <ToolBtn
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        label={<span style={{ textDecoration: 'underline' }}>U</span>}
      />
      <Sep />
      <ToolBtn
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        label={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
            <circle cx="4" cy="6" r="1" fill="currentColor" /><circle cx="4" cy="12" r="1" fill="currentColor" /><circle cx="4" cy="18" r="1" fill="currentColor" />
          </svg>
        }
      />
      <ToolBtn
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        label={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" />
            <text x="2" y="8" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif">1</text>
            <text x="2" y="14" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif">2</text>
            <text x="2" y="20" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif">3</text>
          </svg>
        }
      />
      <ToolBtn
        active={editor.isActive('codeBlock')}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        label={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
          </svg>
        }
      />
      <ToolBtn
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        label={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.182 0-2.258-.525-2.917-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.182 0-2.258-.525-2.917-1.179z" />
          </svg>
        }
      />
      <Sep />
      <div style={{ position: 'relative' }}>
        <ToolBtn
          ref={linkBtnRef}
          active={editor.isActive('link')}
          onClick={() => {
            if (editor.isActive('link')) {
              editor.chain().focus().unsetLink().run();
            } else {
              setLinkUrl('');
              setLinkPopoverOpen((v) => !v);
            }
          }}
          label={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
          }
        />
        {linkPopoverOpen && (
          <div
            ref={linkPopoverRef}
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              zIndex: 100,
              backgroundColor: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              padding: '0.5rem',
              display: 'flex',
              gap: '0.375rem',
              alignItems: 'center',
              width: 280,
            }}
          >
            <input
              autoFocus
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleLinkSubmit(); } if (e.key === 'Escape') setLinkPopoverOpen(false); }}
              style={{
                flex: 1,
                padding: '0.375rem 0.5rem',
                fontSize: '0.8125rem',
                border: '1px solid var(--border)',
                borderRadius: 6,
                outline: 'none',
                minWidth: 0,
              }}
            />
            <button
              type="button"
              onClick={handleLinkSubmit}
              style={{
                padding: '0.375rem 0.625rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: 6,
                border: 'none',
                backgroundColor: 'var(--accent)',
                color: 'white',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Apply
            </button>
          </div>
        )}
      </div>
      <ToolBtn
        active={false}
        onClick={onFileClick}
        label={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
        }
      />
    </div>
  );
}

const ToolBtn = forwardRef<
  HTMLButtonElement,
  { active: boolean; onClick: () => void; label: React.ReactNode }
>(function ToolBtn({ active, onClick, label }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`editor-tool-btn${active ? ' active' : ''}`}
    >
      {label}
    </button>
  );
});

function Sep() {
  return <div className="editor-toolbar-sep" />;
}

function LinkBubbleMenu({ editor }: { editor: Editor }) {
  const [show, setShow] = useState(false);
  const [href, setHref] = useState('');
  const [editing, setEditing] = useState(false);
  const [editUrl, setEditUrl] = useState('');
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleSelectionUpdate() {
      if (!editor.isActive('link')) {
        setShow(false);
        setEditing(false);
        return;
      }
      const linkAttrs = editor.getAttributes('link');
      if (!linkAttrs.href || linkAttrs.href.startsWith('#pending-')) { setShow(false); return; }
      setHref(linkAttrs.href);

      const { view } = editor;
      const { from } = view.state.selection;
      const coords = view.coordsAtPos(from);
      const editorRect = view.dom.closest('.rich-editor-wrapper')?.getBoundingClientRect();
      if (!editorRect) return;

      setPos({
        top: coords.bottom - editorRect.top + 4,
        left: coords.left - editorRect.left,
      });
      setShow(true);
    }

    editor.on('selectionUpdate', handleSelectionUpdate);
    editor.on('transaction', handleSelectionUpdate);
    return () => {
      editor.off('selectionUpdate', handleSelectionUpdate);
      editor.off('transaction', handleSelectionUpdate);
    };
  }, [editor]);

  useEffect(() => {
    if (!show) return;
    function handleClickOutside(e: MouseEvent) {
      if (bubbleRef.current && !bubbleRef.current.contains(e.target as Node)) {
        setShow(false);
        setEditing(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show]);

  if (!show) return null;

  const isFileUpload = href.startsWith('/api/files/');

  const bubbleStyle: React.CSSProperties = {
    position: 'absolute',
    top: pos.top,
    left: Math.max(0, pos.left),
    zIndex: 200,
    backgroundColor: 'var(--bg, #fff)',
    border: '1px solid var(--border, #e0e0e0)',
    borderRadius: 8,
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    padding: '0.375rem 0.5rem',
    display: 'flex',
    gap: '0.375rem',
    alignItems: 'center',
    maxWidth: 360,
  };

  const smallBtnStyle: React.CSSProperties = {
    padding: '0.2rem 0.375rem',
    fontSize: '0.75rem',
    borderRadius: 4,
    border: '1px solid var(--border, #ddd)',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  };

  if (!isFileUpload && editing) {
    return (
      <div ref={bubbleRef} style={bubbleStyle}>
        <input
          autoFocus
          type="url"
          value={editUrl}
          onChange={(e) => setEditUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const url = editUrl.match(/^https?:\/\//) ? editUrl : `https://${editUrl}`;
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
              setEditing(false);
              setHref(url);
            }
            if (e.key === 'Escape') { setEditing(false); }
          }}
          style={{
            flex: 1,
            padding: '0.25rem 0.375rem',
            fontSize: '0.8125rem',
            border: '1px solid var(--border)',
            borderRadius: 6,
            outline: 'none',
            minWidth: 0,
          }}
        />
        <button
          type="button"
          onClick={() => {
            const url = editUrl.match(/^https?:\/\//) ? editUrl : `https://${editUrl}`;
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            setEditing(false);
            setHref(url);
          }}
          style={{
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            borderRadius: 6,
            border: 'none',
            backgroundColor: 'var(--accent, #fe0534)',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
      </div>
    );
  }

  if (isFileUpload) {
    return (
      <div ref={bubbleRef} style={bubbleStyle}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }}>
          Attached file
        </span>
        <button type="button" title="Download file" onClick={() => window.open(href, '_blank', 'noopener,noreferrer')} style={smallBtnStyle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
        <button
          type="button"
          title="Remove attachment"
          onClick={() => {
            editor.chain().focus().extendMarkRange('link').deleteSelection().run();
            setShow(false);
          }}
          style={{ ...smallBtnStyle, color: '#e53e3e' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </button>
      </div>
    );
  }

  const truncated = href.length > 40 ? href.slice(0, 37) + '...' : href;

  return (
    <div ref={bubbleRef} style={bubbleStyle}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '0.8125rem',
          color: 'var(--accent, #fe0534)',
          textDecoration: 'underline',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: 180,
        }}
      >
        {truncated}
      </a>
      <button type="button" title="Edit link" onClick={() => { setEditUrl(href); setEditing(true); }} style={smallBtnStyle}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>
      <button
        type="button"
        title="Remove link"
        onClick={() => {
          editor.chain().focus().extendMarkRange('link').unsetLink().run();
          setShow(false);
        }}
        style={{ ...smallBtnStyle, color: '#e53e3e' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <button type="button" title="Open link" onClick={() => window.open(href, '_blank', 'noopener,noreferrer')} style={smallBtnStyle}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </button>
    </div>
  );
}
