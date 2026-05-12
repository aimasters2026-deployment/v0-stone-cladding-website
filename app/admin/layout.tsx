import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Octo 21st Stone Technology',
  description: 'Administrative dashboard for message routing and media management',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {children}
    </div>
  )
}
