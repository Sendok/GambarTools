'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Wand2, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import Image from 'next/image';
import { auth } from '@/lib/firebase';

// Tambahkan import untuk dropdown
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub();
  }, []);

  const navLinks = [
    { href: '/premium', label: 'Premium' },
    { href: '/blog', label: 'Insights' },
    { href: '/contact', label: 'Contact Us' },
  ];

  // Fungsi logout
  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-card/70 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center gap-2">
        <Image
          src="/logo.png"
          alt="GambarTools Logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <span className="font-bold text-xl font-headline">GambarTools</span>
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
        {!user ? (
          <Button asChild variant="ghost">
            <Link href="/login">Log In</Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 outline-none">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-base font-bold text-accent border">
                  {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <div className="font-medium">{user.displayName || 'No Name'}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/billing">Billing Plan</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
      {/* Mobile menu tetap seperti sebelumnya */}
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
                  <span className="font-bold text-lg">GambarTools</span>
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
              <div className="mt-auto flex flex-col gap-2 border-t pt-4">
                <SheetClose asChild>
                  {!user ? (
                    <Button asChild className="w-full" variant="ghost">
                      <Link href="/login">Log In</Link>
                    </Button>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 outline-none w-full justify-start px-2 py-1.5">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-base font-bold text-accent border">
                            {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                          </div>
                          <span>{user.displayName || user.email}</span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="px-3 py-2">
                          <div className="font-medium">{user.displayName || 'No Name'}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/profile/billing">Billing Plan</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
