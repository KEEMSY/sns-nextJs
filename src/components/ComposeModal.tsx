'use client'

import { useState, useRef, useEffect } from 'react'
import { FaImage, FaGift, FaPoll, FaSmile } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image';

interface ComposeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ComposeModal({ isOpen, onClose }: ComposeModalProps) {
  const [content, setContent] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted content:', content)
    setContent('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            ref={modalRef}
            className="bg-[#1a1a1a] w-full max-w-2xl rounded-xl overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start space-x-4">
                <Image
                  src="https://via.placeholder.com/48"
                  alt="User Avatar"
                  width={48}
                  height={48}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-grow">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="스레드를 시작하세요..."
                    className="w-full bg-transparent text-white text-xl resize-none focus:outline-none min-h-[150px]"
                  />
                  <div className="mt-4 flex items-center">
                    <div className="flex space-x-4 text-gray-400">
                      <button type="button" className="hover:text-blue-400"><FaImage /></button>
                      <button type="button" className="hover:text-blue-400"><FaGift /></button>
                      <button type="button" className="hover:text-blue-400"><FaPoll /></button>
                      <button type="button" className="hover:text-blue-400"><FaSmile /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 p-4 flex justify-between items-center">
              <span className="text-gray-400 text-sm">내 팔로워에게 답글 및 인용 허용</span>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200 font-bold"
              >
                게시
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}