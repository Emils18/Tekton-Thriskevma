'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Logo3D from '@/components/ui/Logo3D';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-white/30">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo with 3D element */}
        <Link href="/" className="flex items-center gap-2 text-brand-green font-bold text-xl no-underline">
          <Logo3D />
          <span className="hidden sm:inline">Tekton Thriskevma</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          {['About', 'Services', 'Projects', 'Contact'].map(item => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="px-4 py-2 rounded-pill text-brand-green hover:bg-brand-light-green/40 hover:text-brand-accent transition-all duration-300"
            >
              {item}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-3 ml-4">
              <span className="text-sm text-brand-green/80">{user.name}</span>
              <AnimatedButton onClick={logout}>Log Out</AnimatedButton>
            </div>
          ) : (
            <AnimatedButton href="/client/login">Log In</AnimatedButton>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-full hover:bg-brand-light-green/50 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/80 backdrop-blur-lg border-b border-white/20 py-2">
          {['About', 'Services', 'Projects', 'Contact'].map(item => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block mx-4 my-1 px-6 py-3 rounded-pill text-center text-brand-green hover:bg-brand-light-green/50 hover:text-brand-accent transition-all"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}
          {user ? (
            <div className="mx-4 my-2 px-6 py-3 flex items-center justify-between rounded-pill bg-brand-green/5">
              <span className="text-sm text-brand-green">{user.name}</span>
              <AnimatedButton onClick={() => { logout(); setOpen(false); }}>Log Out</AnimatedButton>
            </div>
          ) : (
            <div className="mx-4 my-2 flex justify-center">
              <AnimatedButton href="/client/login" onClick={() => setOpen(false)}>Log In</AnimatedButton>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}