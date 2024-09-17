'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { FaHome, FaSearch, FaHeart, FaUser, FaFeatherAlt } from 'react-icons/fa'

export default function Sidebar() {
  const { data: session } = useSession()

  return (
    <aside className="fixed top-0 left-0 h-full w-16 border-r border-gray-800 flex flex-col items-center py-6 bg-black">
      <Link href="/" className="text-2xl font-bold mb-8">T</Link>
      <nav className="flex-grow flex flex-col justify-center space-y-6">
        <NavItem href="/" icon={FaHome} />
        <NavItem href="/search" icon={FaSearch} />
        <NavItem href="/notifications" icon={FaHeart} />
        <NavItem href="/profile" icon={FaUser} />
        <NavItem href="/compose" icon={FaFeatherAlt} />
      </nav>
      {session && (
        <button 
          onClick={() => signOut()} 
          className="text-gray-400 hover:text-white transition duration-200"
        >
          로그아웃
        </button>
      )}
    </aside>
  )
}

function NavItem({ href, icon: Icon }: { href: string; icon: React.ElementType }) {
  return (
    <Link 
      href={href} 
      className="flex items-center justify-center w-12 h-12 hover:bg-gray-800 hover:text-blue-400 rounded-full transition duration-200"
    >
      <Icon className="text-2xl" />
    </Link>
  )
}