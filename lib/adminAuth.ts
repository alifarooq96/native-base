import { getSessionUser } from './auth';

export async function requireAdmin(): Promise<{ userId: string; role: string }> {
  const session = await getSessionUser();
  if (!session || session.role !== 'admin') {
    throw new Error('UNAUTHORIZED');
  }
  return session;
}
