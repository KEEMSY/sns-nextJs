'use client'

import React, { useState } from 'react'
import { FaInstagram, FaCamera, FaPen, FaUserPlus } from 'react-icons/fa'
import { IoMdPerson } from 'react-icons/io'
import { SiThreads } from 'react-icons/si'
import Layout from './Layout'

interface ProfileDetailProps {
  username: string
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ username }) => {
  const [activeTab, setActiveTab] = useState('threads')
  
  // 이 부분은 실제 데이터로 대체해야 합니다
  const user = {
    name: 'KEEMSY',
    username: 'keemsy',
    bio: '🇰🇷',
    followers: 7777,
    following: 777,
  }

  return (
    <Layout
      title="프로필"
      showBackButton={true}
    >
      <div className="bg-[#101010] z-10 p-4 border-b border-gray-800">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-lg">{user.bio}</p>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.username}</p>
            <p className="text-gray-500 mt-2">팔로워 {user.followers}명</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2">
              <IoMdPerson size={32} />
            </div>
            <div className="flex space-x-2">
              <FaInstagram size={24} />
              <SiThreads size={24} />
            </div>
          </div>
        </div>
        <button className="bg-[#1a1a1a] text-white font-bold py-2 px-4 rounded-full w-full mb-4">
          프로필 수정
        </button>
        <div className="flex">
          <button
            className={`flex-1 py-2 ${activeTab === 'threads' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('threads')}
          >
            스레드
          </button>
          <button
            className={`flex-1 py-2 ${activeTab === 'replies' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('replies')}
          >
            답글
          </button>
          <button
            className={`flex-1 py-2 ${activeTab === 'reposts' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('reposts')}
          >
            리포스트
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <IoMdPerson size={20} />
          </div>
          <p className="text-gray-500">스레드를 시작해보세요...</p>
          <button className="ml-auto text-blue-500">게시</button>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-2">프로필 완성하기</h3>
          <p className="text-gray-500 text-sm mb-4">4개 남음</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: FaCamera, text: '프로필 사진 추가', action: '추가' },
              { icon: FaPen, text: '소개 추가', action: '추가' },
              { icon: FaUserPlus, text: '프로필 5개 팔로우', action: '프로필 보기' }
            ].map((item, index) => (
              <div key={index} className="bg-[#1a1a1a] p-4 rounded-lg flex flex-col items-center justify-center text-center">
                <div className="mb-2">
                  <item.icon size={24} />
                </div>
                <p className="text-sm mb-2">{item.text}</p>
                <button className="bg-white text-black text-sm font-bold py-1 px-3 rounded-full">
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProfileDetail