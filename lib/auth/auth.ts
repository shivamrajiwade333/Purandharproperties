import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { COOKIE_NAME, verifyAdminToken, signAdminToken } from './jwt';

export { COOKIE_NAME, verifyAdminToken, signAdminToken };

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function getAdminFromCookies() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}
