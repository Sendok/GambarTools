// app/layout.tsx

import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'GambarTools - Free AI Background Remover, Pixel Resize and AI Image Editor',
  description: 'Remove background, resize images, and customize AI background in one click. No hassle.',
  keywords: [
    'AI Background Remover',
    'AI Image Editor',
    'AI Photo Editor',
    'AI Image Enhancer',
    'AI Photo Enhancer',
    'AI Image Background Removal',
    'AI Photo Background Removal',
    'AI Image Editing Tools',
    'AI Photo Editing Tools',
    'AI Image Tools',
    'AI Photo Tools',
    'AI Image Processing',
    'AI Photo Processing',
    'AI Image Enhancement',
    'AI Photo Enhancement',
    'AI Image Retouching',
    'AI Photo Retouching',
    'AI Image Restoration',
    'AI Photo Restoration',
    'AI Image Cleanup',
    'AI Photo Cleanup',
    'AI Image Correction',
    'AI Photo Correction',
    'AI Image Manipulation',
    'AI Photo Manipulation',
    'AI Image Effects',
    'AI Photo Effects',
    'AI Image Filters',
    'AI Photo Filters',
    'AI Image Resizing',
    'AI Photo Resizing',
    'AI Image Cropping',
    'AI Photo Cropping',
    'AI Image Compression',
    'AI Photo Compression',
  ],
  authors: [
    {
      name: 'GambarTools',
      url: 'https://gambartools.com',
    },
  ],
  openGraph: {
    title: 'GambarTools - AI Background Remover and Image Editor',
    description: 'Remove background, resize images, and customize AI background in one click.',
    url: 'https://www.gambartools.com',
    type: 'website',
    siteName: 'GambarTools',
    images: [
      {
        url: 'https://www.gambartools.com/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'GambarTools Preview',
      },
    ],
  },
  twitter: {
    title: 'GambarTools - AI Background Remover and Image Editor',
    description: 'Remove background, resize images, and customize AI background in one click.',
    card: 'summary_large_image',
    images: ['https://www.gambartools.com/og-cover.png'],
    creator: '@gambartools',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-16x16.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
      },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
  colorScheme: 'light dark',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: 'https://www.gambartools.com',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
