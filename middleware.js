import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const vercelEnv = process.env.VERCEL_ENV;
  const isProdDeployment =
    vercelEnv === 'production' || (!vercelEnv && process.env.NODE_ENV === 'production');

  if (!isProdDeployment) {
    return NextResponse.next();
  }
  if (pathname === '/manage-projects') {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
  if (pathname === '/api/projects' && ['POST', 'PUT'].includes(request.method)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  if (pathname === '/api/admin/upload' && request.method === 'POST') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/manage-projects',
    '/api/projects',
    '/api/admin/upload',
  ],
};
