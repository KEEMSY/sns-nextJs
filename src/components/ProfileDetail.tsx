'use client'

import React from 'react'
import { FaArrowLeft, FaCalendarAlt, FaLink } from 'react-icons/fa'
import Link from 'next/link'

interface ProfileDetailProps {
  username: string
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ username }) => {
  // 이 부분은 실제 데이터로 대체해야 합니다
  const user = {
    name: '김개발',
    username: '@dev_kim',
    bio: '프론트엔드 개발자 | React & TypeScript 열혈팬',
    followers: 1234,
    following: 567,
    joinDate: '2022년 1월',
    website: 'https://devkim.com'
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <header className="p-4 border-b border-gray-800">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <FaArrowLeft className="text-xl" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-500">1,234 스레드</p>
          </div>
        </div>
      </header>
      <div className="p-4">
        <img
          src="https://via.placeholder.com/150"
          alt={user.name}
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500 mb-4">{user.username}</p>
        <p className="mb-4">{user.bio}</p>
        <div className="flex items-center text-gray-500 mb-4">
          <FaCalendarAlt className="mr-2" />
          <span>가입일: {user.joinDate}</span>
        </div>
        {user.website && (
          <div className="flex items-center text-blue-400 mb-4">
            <FaLink className="mr-2" />
            <a href={user.website} target="_blank" rel="noopener noreferrer">
              {user.website}
            </a>
          </div>
        )}
        <div className="flex mb-4">
          <p className="mr-4"><span className="font-bold">{user.following}</span> 팔로잉</p>
          <p><span className="font-bold">{user.followers}</span> 팔로워</p>
        </div>
        <button className="bg-white text-black font-bold py-2 px-4 rounded-full">
          프로필 수정
        </button>
      </div>
      {/* 여기에 사용자의 스레드 목록을 추가할 수 있습니다 */}
    </div>
  )
}

export default ProfileDetail