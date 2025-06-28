import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'GambarTools - AI Background Remover and AI  Image Editor',
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
  },
  twitter: {
    title: 'GambarTools - AI Background Remover and Image Editor',
    card: 'summary_large_image',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-16x16.png',
  },
  themeColor: '#ffffff',
  colorScheme: 'light dark',
  description: 'Effortlessly edit your product photos with AI.',
};

export const viewport = {
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
