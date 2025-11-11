'use client'

import { Sidebar } from '@/components/Sidebar'

interface LayoutProps {
  children: React.ReactNode
  userEmail?: string
  onLogout: () => void
}

export function Layout({ children, userEmail, onLogout }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar userEmail={userEmail} onLogout={onLogout} />
      <main className="flex-1 overflow-y-auto lg:pl-64">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

