export function normalizeName(raw: string | null | undefined): string | null {
  if (!raw) return null;

  const trimmed = raw.replace(/\s+/g, ' ').trim();
  if (!trimmed) return null;

  return trimmed
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
