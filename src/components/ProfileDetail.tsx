'use client'

import React, { useState, useEffect } from 'react'
import { FaInstagram, FaCamera, FaPen, FaUserPlus, FaBookmark } from 'react-icons/fa'
import { IoMdPerson } from 'react-icons/io'
import { SiThreads } from 'react-icons/si'
import { BiRepost } from 'react-icons/bi'
import { motion } from 'framer-motion'
import Layout from './Layout'
import ComposeModal from './ComposeModal'
import { dummyClubs, dummyCurrentUser, dummyUsers } from '../lib/dummyData'

interface ProfileDetailProps {
  userId: string;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState<TabType>('threads')
  const [activeThreadView, setActiveThreadView] = useState<'threads' | 'saved' | 'reposts'>('threads')
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userClubs, setUserClubs] = useState<any[]>([])

  useEffect(() => {
    const foundUser = dummyUsers.find(u => u.userId === userId);
    setUser(foundUser || null);
    setUserClubs(dummyClubs.slice(0, 3));
  }, [userId]);

  const isCurrentUser = user?.userId === dummyCurrentUser.userId

  const tabs = ['threads', 'clubs'] as const;
  type TabType = typeof tabs[number];
  const tabNames: Record<TabType, string> = {
    threads: '스레드',
    clubs: '클럽'
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'threads':
        return (
          <div>
            {isCurrentUser && (
              <div className="flex justify-center mb-6">
                <div className="inline-flex bg-gray-800 rounded-full p-2">
                  {['threads', 'saved', 'reposts'].map((view) => (
                    <motion.button
                      key={view}
                      className={`p-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeThreadView === view ? 'text-blue-500' : 'text-gray-400'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveThreadView(view as 'threads' | 'saved' | 'reposts')}
                      title={view.charAt(0).toUpperCase() + view.slice(1)}
                    >
                      {view === 'threads' && <SiThreads size={20} />}
                      {view === 'saved' && <FaBookmark size={20} />}
                      {view === 'reposts' && <BiRepost size={20} />}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            {activeThreadView === 'threads' && <div>스레드 내용</div>}
            {activeThreadView === 'saved' && <div>저장된 포스트 내용</div>}
            {activeThreadView === 'reposts' && <div>리포스트 내용</div>}
          </div>
        )
      case 'clubs':
        return (
          <div className="grid grid-cols-2 gap-4">
            {userClubs.map(club => (
              <div key={club.id} className="bg-gray-800 p-4 rounded-lg">
                <div className={`w-12 h-12 ${club.color} rounded-full flex items-center justify-center text-xl font-bold text-white mb-2`}>
                  {club.name[0]}
                </div>
                <h3 className="text-white font-semibold">{club.name}</h3>
                <p className="text-gray-400 text-sm">{club.memberCount.toLocaleString()} 멤버</p>
              </div>
            ))}
          </div>
        )
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
        <div className="flex justify-center mt-3 mb-4 relative w-full">
          <div className="relative flex w-full max-w-2xl justify-between">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`text-white font-semibold px-4 py-2 flex-1 text-lg ${activeTab === tab ? 'text-blue-500' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tabNames[tab]}
              </button>
            ))}
            <motion.div
              className="absolute bottom-0 h-0.5 bg-blue-500"
              initial={false}
              animate={{
                left: `calc(${tabs.indexOf(activeTab) * 50}% + 5%)`,
                width: 'calc(90% / 2)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
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
              <div className="grid grid-cols-2 gap-4">
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
