'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Wand2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/premium', label: 'Premium' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-card/70 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center gap-2">
        <Wand2 className="h-6 w-6 text-accent" />
        <span className="font-bold text-xl font-headline">EditClean</span>
      </Link>
      <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            className="text-sm font-medium hover:text-accent transition-colors underline-offset-4 hover:underline"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </nav>
      <div className="ml-auto md:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] bg-card">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b pb-4">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Wand2 className="h-6 w-6 text-accent" />
                  <span className="font-bold text-lg">EditClean</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4 py-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base font-medium hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto border-t pt-4">
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
