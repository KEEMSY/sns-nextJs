import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'

export default function FloatingComposeButton() {
  return (
    <Link href="/compose" className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-200">
      <FaPlus className="text-xl" />
    </Link>
  )
}