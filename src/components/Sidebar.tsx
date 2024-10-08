'use client';

import { useState, useRef } from 'react'
import Link from 'next/link'
import { FaHome, FaSearch, FaHeart, FaUser, FaFeatherAlt, FaUsers, FaSignOutAlt } from 'react-icons/fa'
import ComposeModal from './ComposeModal'
import SignUpModal from './SignUpModal'
import { useAuth } from '../contexts/AuthContext'

export default function Sidebar() {
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const composeButtonRef = useRef<HTMLButtonElement>(null)
  const { isLoggedIn, user, logout } = useAuth()

  const handleComposeClick = () => {
    setIsComposeModalOpen(true)
  }

  const handleSignUpClick = () => {
    setIsSignUpModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsComposeModalOpen(false)
    setIsSignUpModalOpen(false)
    if (composeButtonRef.current) {
      composeButtonRef.current.blur()
    }
  }

  return (
    <>
      <aside className="fixed top-0 left-0 h-full w-16 border-r border-gray-800 flex flex-col items-center py-6 bg-black">
        <Link href="/" className="text-2xl font-bold mb-8">T</Link>
        <nav className="flex-grow flex flex-col justify-center space-y-6">
          <NavItem href="/" icon={FaHome} />
          <NavItem href="/search" icon={FaSearch} />
          <NavItem href="/notifications" icon={FaHeart} />
          <NavItem href="/clubs" icon={FaUsers} /> 
          <NavItem href={isLoggedIn ? `/profile/${user?.id}` : "/profile"} icon={FaUser} />
          <button
            ref={composeButtonRef}
            onClick={handleComposeClick}
            className="flex items-center justify-center w-12 h-12 rounded-full transition duration-200 hover:bg-gray-800 hover:text-blue-400 focus:outline-none"
          >
            <FaFeatherAlt className="text-2xl" />
          </button>
        </nav>
        {isLoggedIn && (
          <button
            onClick={logout}
            className="flex items-center justify-center w-12 h-12 rounded-full transition duration-200 hover:bg-gray-800 hover:text-blue-400 focus:outline-none mt-auto"
          >
            <FaSignOutAlt className="text-2xl" />
          </button>
        )}
      </aside>
      <ComposeModal
        isOpen={isComposeModalOpen}
        onClose={handleCloseModal}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={handleCloseModal}
      />
    </>
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