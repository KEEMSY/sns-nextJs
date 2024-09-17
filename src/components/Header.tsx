'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { FaHome, FaHashtag, FaBell, FaUser, FaSearch, FaSignOutAlt } from 'react-icons/fa'
import { useRouter, usePathname } from 'next/navigation'

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-500">MySNS</Link>
          <nav className="flex items-center space-x-1">
            <NavItem href="/" icon={FaHome} label="홈" active={pathname === '/'} />
            <NavItem href="/explore" icon={FaHashtag} label="탐색하기" active={pathname === '/explore'} />
            <NavItem href="/notifications" icon={FaBell} label="알림" active={pathname === '/notifications'} />
            <NavItem href="/profile" icon={FaUser} label="프로필" active={pathname === '/profile'} />
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="검색"
                className="w-48 pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {session ? (
              <button 
                onClick={() => signOut()} 
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-200"
              >
                <FaSignOutAlt />
              </button>
            ) : (
              <button 
                onClick={() => router.push('/auth/login')} 
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function NavItem({ href, icon: Icon, label, active }: { href: string; icon: React.ElementType; label: string; active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center px-4 py-2 rounded-full transition duration-200 ${
        active ? 'text-blue-500 font-bold' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} className="mr-2" />
      <span className="hidden md:inline">{label}</span>
    </Link>
  )
}