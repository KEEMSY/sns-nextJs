'use client'

import { FaUser, FaMapMarkerAlt, FaLink, FaRegCalendarAlt } from 'react-icons/fa'
import { useState } from 'react'

type ProfileProps = {
  user: {
    name: string
    username: string
    bio: string
    location: string
    website: string
    joinDate: string
    followers: number
    following: number
  }
}

export default function ProfilePage({ user }: ProfileProps) {
  const [activeTab, setActiveTab] = useState('posts')

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex items-start mb-4">
        <div className="w-24 h-24 rounded-full bg-gray-300 mr-4 flex items-center justify-center">
          <FaUser className="text-gray-600" size={48} />
        </div>
        <div>
          <h2 className="font-bold text-2xl">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>
        </div>
      </div>
      <p className="text-gray-800 mb-4">{user.bio}</p>
      <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
        <span className="flex items-center">
          <FaMapMarkerAlt className="mr-1" /> {user.location}
        </span>
        <span className="flex items-center">
          <FaLink className="mr-1" /> {user.website}
        </span>
        <span className="flex items-center">
          <FaRegCalendarAlt className="mr-1" /> {user.joinDate}
        </span>
      </div>
      <div className="flex space-x-4 mb-4">
        <span className="font-bold">{user.followers} 팔로워</span>
        <span className="font-bold">{user.following} 팔로잉</span>
      </div>
      <div className="flex space-x-2 mb-4">
        <button 
          className={`px-4 py-2 rounded-full font-medium ${activeTab === 'posts' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveTab('posts')}
        >
          게시물
        </button>
        <button 
          className={`px-4 py-2 rounded-full font-medium ${activeTab === 'media' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveTab('media')}
        >
          미디어
        </button>
        <button 
          className={`px-4 py-2 rounded-full font-medium ${activeTab === 'likes' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveTab('likes')}
        >
          좋아요
        </button>
      </div>
      {/* 여기에 선택된 탭에 따른 컨텐츠를 표시합니다 */}
    </div>
  )
}