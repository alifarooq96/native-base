'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Image as TiptapImage } from '@tiptap/extension-image';
import { Link as TiptapLink } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Underline } from '@tiptap/extension-underline';
import { useCallback, useRef } from 'react';
import type { Editor, JSONContent } from '@tiptap/react';

interface RichEditorProps {
  content?: JSONContent;
  onChange?: (json: JSONContent) => void;
  placeholder?: string;
  editable?: boolean;
}

async function uploadFile(file: File): Promise<string> {
  const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.url;
}

function insertImageFromFile(editor: Editor, file: File) {
  uploadFile(file).then((url) => {
    editor.chain().focus().setImage({ src: url, alt: file.name }).run();
  });
}

function insertFileLink(editor: Editor, file: File) {
  uploadFile(file).then((url) => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: 'text',
        text: file.name,
        marks: [{ type: 'link', attrs: { href: url, target: '_blank' } }],
      })
      .insertContent({ type: 'text', text: ' ' })
      .run();
  });
}

function handleFileInsert(editor: Editor, file: File) {
  if (file.type.startsWith('image/')) {
    insertImageFromFile(editor, file);
  } else {
    insertFileLink(editor, file);
  }
}

export function RichEditor({
  content,
  onChange,
  placeholder = 'Describe the workflow you want automated...',
  editable = true,
}: RichEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor | null>(null);

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
      handleDrop(_view, event) {
        if (!editable || !editorRef.current) return false;
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          event.preventDefault();
          Array.from(files).forEach((f) => handleFileInsert(editorRef.current!, f));
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
              handleFileInsert(editorRef.current!, file);
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
      Array.from(files).forEach((f) => handleFileInsert(editor, f));
      e.target.value = '';
    },
    [editor]
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
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor, onFileClick }: { editor: Editor; onFileClick: () => void }) {
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
      <ToolBtn
        active={false}
        onClick={() => {
          const url = window.prompt('URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        label={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
        }
      />
      <ToolBtn
        active={false}
        onClick={onFileClick}
        label={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        }
      />
    </div>
  );
}

function ToolBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`editor-tool-btn${active ? ' active' : ''}`}
    >
      {label}
    </button>
  );
}

function Sep() {
  return <div className="editor-toolbar-sep" />;
}
