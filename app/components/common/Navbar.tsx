'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Skywell
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/blogs" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <Button asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
} 