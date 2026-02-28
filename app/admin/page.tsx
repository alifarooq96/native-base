import { AdminClientList } from '@/components/AdminClientList';

export default function AdminPage() {
  return (
    <div
      style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '2rem 1.5rem',
      }}
    >
      <h1
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '1.5rem',
        }}
      >
        Clients
      </h1>
      <AdminClientList />
    </div>
  );
}
