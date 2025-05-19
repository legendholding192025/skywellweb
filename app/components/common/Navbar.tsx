'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Skywell
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-primary transition-colors duration-300">
              Home
            </Link>
            <Link href="/blogs" className="hover:text-primary transition-colors duration-300">
              Blog
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors duration-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors duration-300">
              Contact
            </Link>
          </div>

          {/* Call and CTA Buttons */}
          <div className="flex items-center space-x-4">
            <a 
              href="tel:04 221 9958" 
              className="hidden md:flex items-center space-x-2 text-sm font-medium hover:text-primary transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-primary/10"
            >
              <Phone className="h-4 w-4 transform group-hover:rotate-12 transition-all duration-300 group-hover:scale-110" />
              <span className="group-hover:translate-x-1 transition-transform duration-300">04 221 9958</span>
            </a>
            <Button asChild className="hidden md:inline-flex">
              <Link href="/contact">Get Started</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link href="/blogs" className="text-lg font-medium hover:text-primary transition-colors">
                    Blog
                  </Link>
                  <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors">
                    Contact
                  </Link>
                  <a 
                    href="tel:04 221 9958" 
                    className="flex items-center space-x-2 text-lg font-medium hover:text-primary transition-all duration-300 group"
                  >
                    <Phone className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-300" />
                    <span>04 221 9958</span>
                  </a>
                  <Button asChild className="mt-4">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
} 