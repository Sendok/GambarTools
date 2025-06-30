// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.gambartools.com';

  const staticPages = [
    '/',
    '/blog',
    '/contact',
    '/premium',
    '/login',
    '/register',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.7'}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
