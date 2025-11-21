'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GoLogo } from './go-logo'

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <GoLogo />
            <span className="text-xl font-bold text-foreground">Bishoftu</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary font-semibold' 
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              href="/accommodations"
              className={`text-sm font-medium transition-colors ${
                isActive('/accommodations') 
                  ? 'text-primary font-semibold' 
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Accommodations
            </Link>
            <Link
              href="/explore"
              className={`text-sm font-medium transition-colors ${
                isActive('/explore') 
                  ? 'text-primary font-semibold' 
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
