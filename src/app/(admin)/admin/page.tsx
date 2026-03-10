import type { Metadata } from 'next'
import { AdminLogin } from '@/components/admin/admin-login'

export const metadata: Metadata = {
  title: 'Admin Panel | Dulce Antojo',
  description: 'Admin panel for managing payments',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return <AdminLogin />
}
