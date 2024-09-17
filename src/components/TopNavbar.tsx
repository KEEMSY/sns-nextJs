'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function TopNavbar() {
  const { data: session } = useSession()

  if (session) return null

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">T</Link>
      <div className="space-x-4">
        <Link href="/login" className="hover:text-blue-400 transition duration-200">로그인</Link>
        <Link href="/signup" className="hover:text-blue-400 transition duration-200">회원가입</Link>
      </div>
    </nav>
  )
}