'use client'

import React, { useState, useEffect } from 'react'
import { FaInstagram, FaCamera, FaPen, FaUserPlus } from 'react-icons/fa'
import { IoMdPerson } from 'react-icons/io'
import { SiThreads } from 'react-icons/si'
import Layout from './Layout'
import ComposeModal from './ComposeModal'
import { dummyCurrentUser, dummyUsers } from '../lib/dummyData'

interface ProfileDetailProps {
  userId: string;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('threads')
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const foundUser = dummyUsers.find(u => u.userId === userId);
    setUser(foundUser || null);
  }, [userId]);

  const isCurrentUser = user?.userId === dummyCurrentUser.userId

  const renderContent = () => {
    switch(activeTab) {
      case 'threads':
        return <div>스레드 내용</div>
      case 'replies':
        return <div>답글 내용</div>
      case 'reposts':
        return <div>리포스트 내용</div>
      default:
        return null
    }
  }

  if (!user) {
    return <div className="flex justify-center items-center h-full">Loading...</div>
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
            <p className="text-gray-500">@{user.username}</p>
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
        {isCurrentUser && (
          <button className="bg-[#1a1a1a] text-white font-bold py-2 px-4 rounded-full w-full mb-4">
            프로필 수정
          </button>
        )}
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
        {renderContent()}
      </div>

      {activeTab === 'threads' && (
        <>
          <div className="p-4 border-t border-b border-gray-700">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setIsComposeModalOpen(true)}
            >
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                <IoMdPerson size={20} />
              </div>
              <p className="text-gray-500 flex-grow">스레드를 시작하세요...</p>
              <button className="bg-gray-800 text-gray-400 px-4 py-1 rounded-full text-sm font-semibold">
                게시
              </button>
            </div>
          </div>

          {isCurrentUser && (
            <div className="p-4 bg-[#101010]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">프로필 완성하기</h3>
                <span className="text-gray-500 text-sm">4개 남음</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#1c1c1c] p-4 rounded-lg flex flex-col items-center text-center">
                  <div className="bg-[#2a2a2a] rounded-full p-3 mb-2">
                    <FaCamera className="text-white" size={24} />
                  </div>
                  <h4 className="font-semibold mb-1">프로필 사진 추가</h4>
                  <p className="text-gray-500 text-sm mb-3">사람들이 회원님을 알아볼 수 있게 설정해보세요.</p>
                  <button className="bg-white text-black font-bold py-2 px-4 rounded-full w-full">
                    추가
                  </button>
                </div>
                <div className="bg-[#1c1c1c] p-4 rounded-lg flex flex-col items-center text-center">
                  <div className="bg-[#2a2a2a] rounded-full p-3 mb-2">
                    <FaPen className="text-white" size={24} />
                  </div>
                  <h4 className="font-semibold mb-1">소개 추가</h4>
                  <p className="text-gray-500 text-sm mb-3">회원님을 소개하고 사람들에게 회원님의 관심사를 알려주세요.</p>
                  <button className="bg-white text-black font-bold py-2 px-4 rounded-full w-full">
                    추가
                  </button>
                </div>
                <div className="bg-[#1c1c1c] p-4 rounded-lg flex flex-col items-center text-center">
                  <div className="bg-[#2a2a2a] rounded-full p-3 mb-2">
                    <FaUserPlus className="text-white" size={24} />
                  </div>
                  <h4 className="font-semibold mb-1">프로필 5개 팔로우</h4>
                  <p className="text-gray-500 text-sm mb-3">관심 있는 스레드로 피드를 채워 보세요.</p>
                  <button className="bg-white text-black font-bold py-2 px-4 rounded-full w-full">
                    프로필 보기
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <ComposeModal
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
      />
    </Layout>
  )
}

export default ProfileDetail