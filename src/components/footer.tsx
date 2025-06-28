import Link from 'next/link';
import Image from 'next/image';
import { Wand2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
           <Image
              src="/logo.png" // Place your logo in the public directory
              alt="GambarTools Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          <span className="font-bold text-lg">GambarTools</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} GambarTools. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/policy"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/policy"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
