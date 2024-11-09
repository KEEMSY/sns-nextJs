'use client'

import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import { FaInstagram, FaCamera, FaPen, FaUserPlus, FaBookmark, FaUsers, FaPhone, FaEnvelope } from 'react-icons/fa'
import { IoMdPerson } from 'react-icons/io'
import { SiThreads, SiKakaotalk } from 'react-icons/si'
import { FaComments } from 'react-icons/fa'
import { BiRepost } from 'react-icons/bi'
import { motion } from 'framer-motion'
import Layout from './Layout'
import ComposeModal from './ComposeModal'
import { dummyClubs, dummyCurrentUser, dummyUsers } from '../lib/dummyData'
import Image from 'next/image';
interface ProfileDetailProps {
  userId: string;
}

interface User {
  userId: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  instagramUrl?: string;
  threadsUrl?: string;
  email?: string;
  phone?: string;
  kakaoId?: string;
  threads?: Thread[]; // Thread 인터페이스 정의 필요(임시 처리)
  savedPosts?: Post[]; // Post 인터페이스 정의 필요(임시 처리)
  reposts?: Repost[]; // Repost 인터페이스 정의 필요(임시 처리) 
}

interface Club {
  id: string;
  name: string;
  color: string;
  memberCount: number;
}

// 임시 처리
interface Thread {
  id: string;
  content: string;
  // 기타 필요한 속성들...
}

interface Post {
  id: string;
  content: string;
  // 기타 필요한 속성들...
}

interface Repost {
  id: string;
  originalPost: Post;
  // 기타 필요한 속성들...
}

// 임시 처리 끝

const ProfileDetail: React.FC<ProfileDetailProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState<'threads' | 'clubs'>('threads')
  const [activeThreadView, setActiveThreadView] = useState<'threads' | 'saved' | 'reposts'>('threads')
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [userClubs, setUserClubs] = useState<Club[]>([])

  const [threadBarWidth, setThreadBarWidth] = useState(0);
  const [threadBarLeft, setThreadBarLeft] = useState(0);
  const threadViewRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const threadViewContainerRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef(0);
  const [threadScrollPosition, setThreadScrollPosition] = useState(0);
  const [clubScrollPosition, setClubScrollPosition] = useState(0);
  const threadContentRef = useRef<HTMLDivElement>(null);
  const clubContentRef = useRef<HTMLDivElement>(null);


  const measureThreadView = useCallback(() => {
    const activeViewIndex = ['threads', 'saved', 'reposts'].indexOf(activeThreadView);
    const activeViewElement = threadViewRefs.current[activeViewIndex];
    const container = threadViewContainerRef.current;
    if (activeViewElement && container) {
      const viewRect = activeViewElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const iconWidth = activeViewElement.querySelector('svg')?.getBoundingClientRect().width || 0;
      setThreadBarWidth(iconWidth);
      setThreadBarLeft(viewRect.left - containerRect.left + (viewRect.width - iconWidth) / 2);
    }
  }, [activeThreadView]);

  useEffect(() => {
    measureThreadView();
    window.addEventListener('resize', measureThreadView);
    return () => {
      window.removeEventListener('resize', measureThreadView);
    };
  }, [activeTab, activeThreadView, measureThreadView]);

  useEffect(() => {
    const foundUser = dummyUsers.find(u => u.userId === userId);
    setUser(foundUser || null);
    setUserClubs(dummyClubs.slice(0, 3));
  }, [userId]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 추가
    const handleScroll = () => {
      scrollPosition.current = window.pageYOffset;
    };
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // activeTab이 변경될 때마다 이전 스크롤 위치로 복원
    window.scrollTo(0, scrollPosition.current);
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      if (activeTab === 'threads') {
        setThreadScrollPosition(window.pageYOffset);
      } else {
        setClubScrollPosition(window.pageYOffset);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  useLayoutEffect(() => {
    if (activeTab === 'threads') {
      if (threadContentRef.current) {
        threadContentRef.current.scrollTop = threadScrollPosition;
      }
    } else {
      if (clubContentRef.current) {
        clubContentRef.current.scrollTop = clubScrollPosition;
      }
    }
  }, [activeTab, threadScrollPosition, clubScrollPosition]);

  const isCurrentUser = user?.userId === dummyCurrentUser.userId

  const tabs = ['threads', 'clubs'] as const;
  type TabType = typeof tabs[number];
  const tabNames: Record<TabType, string> = {
    threads: '스레드',
    clubs: '클럽'
  }

  const tabIcons = {
    threads: FaComments,
    clubs: FaUsers
  }

  const handleTabChange = (tab: 'threads' | 'clubs') => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'threads':
        return (
          <div ref={threadContentRef} style={{height: 'calc(100vh - 300px)', overflowY: 'auto'}}>
            {isCurrentUser && (
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
                <div className="flex justify-center">
                  <div ref={threadViewContainerRef} className="flex justify-between rounded-full p-2 w-full max-w-md relative">
                    {['threads', 'saved', 'reposts'].map((view, index) => (
                      <motion.button
                        key={view}
                        ref={(el: HTMLButtonElement | null) => {
                          if (el) threadViewRefs.current[index] = el;
                        }}
                        className={`flex items-center justify-center p-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          activeThreadView === view ? 'text-blue-500' : 'text-gray-400'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ scale: activeThreadView === view ? 1.1 : 1 }}
                        onClick={() => setActiveThreadView(view as 'threads' | 'saved' | 'reposts')}
                        title={view.charAt(0).toUpperCase() + view.slice(1)}
                      >
                        {view === 'threads' && <SiThreads size={20} />}
                        {view === 'saved' && <FaBookmark size={20} />}
                        {view === 'reposts' && <BiRepost size={30} />}
                      </motion.button>
                    ))}
                    <motion.div
                      className="absolute bottom-0 h-0.5 bg-blue-500"
                      initial={false}
                      animate={{
                        left: threadBarLeft,
                        width: threadBarWidth
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  </div>
                </div>
              </>
            )}
            {activeThreadView === 'threads' && (
              <div>
                {user?.threads && user.threads.length > 0 ? (
                  <div>스레드 내용</div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <p>아직 작성한 스레드가 없습니다.</p>
                  </div>
                )}
              </div>
            )}
            {activeThreadView === 'saved' && (
              <div>
                {user?.savedPosts && user.savedPosts.length > 0 ? (
                  <div>저장된 포스트 내용</div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <p>저장된 포스트가 없습니다.</p>
                    <p>관심있는 포스트를 저장해보세요!</p>
                  </div>
                )}
              </div>
            )}
            {activeThreadView === 'reposts' && (
              <div>
                {user?.reposts && user.reposts.length > 0 ? (
                  <div>리포스트 내용</div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <p>리포스트한 내용이 없습니다.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      case 'clubs':
        return (
          <div ref={clubContentRef} style={{height: 'calc(100vh - 300px)', overflowY: 'auto'}}>
            {userClubs.map(club => (
              <div key={club.id} className="bg-gray-800 p-4 rounded-lg mb-4">
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

  const isDefaultAvatar = user?.avatar?.startsWith('https://ui-avatars.com/api/') ?? true;

  const remainingTasks = React.useMemo(() => {
    if (!user) return 0;
    return [isDefaultAvatar, !user.bio, (user.following || 0) < 5].filter(Boolean).length;
  }, [user, isDefaultAvatar]);

  if (!user) {
    return <div className="flex justify-center items-center h-full">Loading...</div>
  }

  return (
    <Layout
      title="프로필"
      showBackButton={true}
      rightSidebar={
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">추천 유저</h2>
          {/* 추천 유저 목록 */}
          {dummyUsers.slice(0, 5).map(user => (
            <div key={user.userId} className="flex items-center gap-3 mb-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-400">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      }
    >
      <div className="bg-[#101010] z-10 p-4 border-b border-gray-800">
        <div className="bg-[#101010] p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-700 rounded-full overflow-hidden mb-4 border-4 border-gray-700">
              <Image 
                src={user.avatar} 
                alt={user.name} 
                width={128} 
                height={128} 
                className="object-cover"
                unoptimized={user.avatar.startsWith('https://ui-avatars.com')}
              />
            </div>
            <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
            <p className="text-gray-400 text-lg mb-2">@{user.username}</p>
            
            <div className="flex items-center space-x-6 mb-4">
              <p className="text-gray-300"><span className="font-semibold text-white text-lg">{user.followers}</span> 팔로워</p>
              <p className="text-gray-300"><span className="font-semibold text-white text-lg">{user.following}</span> 팔로잉</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              {user.instagramUrl && (
                <a href={user.instagramUrl} target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-pink-500 transition-colors">
                  <FaInstagram size={20} />
                </a>
              )}
              {user.threadsUrl && (
                <a href={user.threadsUrl} target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-white transition-colors">
                  <SiThreads size={20} />
                </a>
              )}
              {user.email && (
                <a href={`mailto:${user.email}`} 
                   className="text-gray-400 hover:text-red-500 transition-colors">
                  <FaEnvelope size={20} />
                </a>
              )}
              {user.phone && (
                <a href={`tel:${user.phone}`} 
                   className="text-gray-400 hover:text-green-500 transition-colors">
                  <FaPhone size={20} />
                </a>
              )}
              {user.kakaoId && (
                <a href={`https://open.kakao.com/o/${user.kakaoId}`} target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <SiKakaotalk size={20} />
                </a>
              )}
            </div>

            {user.bio && (
              <p className="text-gray-200 text-lg mt-4 mb-4 text-center leading-relaxed">{user.bio}</p>
            )}


            {isCurrentUser && user && remainingTasks > 0 && (
              <div className="mt-4 p-4 bg-[#101010]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">프로필 완성하기</h3>
                  <span className="text-gray-500 text-sm">{remainingTasks}개 남음</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {isDefaultAvatar && (
                    <div className="bg-[#1c1c1c] p-4 rounded-lg flex flex-col items-center text-center h-full">
                      <div className="flex-grow flex flex-col items-center justify-center">
                        <div className="bg-[#2a2a2a] rounded-full p-3 mb-2">
                          <FaCamera className="text-white" size={24} />
                        </div>
                        <h4 className="font-semibold mb-1">프로필 사진 추가</h4>
                        <p className="text-gray-500 text-sm mb-3">사람들이 회원님을 알아볼 수 있게 설정해보세요.</p>
                      </div>
                      <button className="bg-white text-black font-bold py-2 px-4 rounded-full w-full mt-auto">
                        추가
                      </button>
                    </div>
                  )}
                  {!user.bio && (
                    <div className="bg-[#1c1c1c] p-4 rounded-lg flex flex-col items-center text-center h-full">
                      <div className="flex-grow flex flex-col items-center justify-center">
                        <div className="bg-[#2a2a2a] rounded-full p-3 mb-2">
                          <FaPen className="text-white" size={24} />
                        </div>
                        <h4 className="font-semibold mb-1">소개 추가</h4>
                        <p className="text-gray-500 text-sm mb-3">회원님을 소개하고 사람들에게 회원님의 관심사를 알려주세요.</p>
                      </div>
                      <button className="bg-white text-black font-bold py-2 px-4 rounded-full w-full mt-auto">
                        추가
                      </button>
                    </div>
                  )}
                  {user.following < 5 && (
                    <div className="bg-[#1c1c1c] p-4 rounded-lg flex flex-col items-center text-center h-full">
                      <div className="flex-grow flex flex-col items-center justify-center">
                        <div className="bg-[#2a2a2a] rounded-full p-3 mb-2">
                          <FaUserPlus className="text-white" size={24} />
                        </div>
                        <h4 className="font-semibold mb-1">프로필 5개 팔로우</h4>
                        <p className="text-gray-500 text-sm mb-3">관심 있는 스레드로 피드를 채워 보세요.</p>
                      </div>
                      <button className="bg-white text-black font-bold py-2 px-4 rounded-full w-full mt-auto">
                        프로필 보기
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 relative w-full">
        <div className="relative flex w-full max-w-md bg-[#1a1a1a] rounded-full overflow-hidden p-1">
          <motion.div
            className="absolute top-1 bottom-1 rounded-full bg-blue-500"
            layoutId="activeTabBackground"
            initial={false}
            animate={{
              left: activeTab === 'threads' ? '0%' : '50%',
              right: activeTab === 'threads' ? '50%' : '0%',
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          {tabs.map((tab) => {
            const TabIcon = tabIcons[tab];
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`relative z-10 flex items-center justify-center py-2 px-4 flex-1 transition-all duration-200 ${
                  activeTab === tab 
                    ? 'text-white' 
                    : 'text-gray-400'
                }`}
              >
                <TabIcon className="mr-2" size={18} />
                {tabNames[tab]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        {renderContent()}
      </div>

      <ComposeModal
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
      />
    </Layout>
  )
}

export default ProfileDetail
