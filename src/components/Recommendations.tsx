import React, { useState } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  userId: string;
  name: string;
  username: string;
  color: string;
}

interface Club {
  id: string;
  name: string;
  clubName: string;
  color: string;
}

interface RecommendationsProps {
  users: User[];
  clubs: Club[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ users, clubs }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'clubs'>('users');

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '20px', // 중앙 카드 여백을 조정
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: '10px', // 모바일에서 여백 조정
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '5px', // 모바일에서 여백 조정
        },
      },
    ],
  };

  const tabVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 }
  };

  return (
    <div className="bg-[#1e1e1e] rounded-xl p-4 my-4 shadow-lg" style={{ margin: '10px 15px' }}>
      <div className="flex justify-center mb-4 relative">
        <div className="relative">
          <button
            className={`text-white font-semibold px-4 py-2 ${activeTab === 'users' ? 'text-blue-500' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            사용자 추천
          </button>
          <button
            className={`text-white font-semibold px-4 py-2 ${activeTab === 'clubs' ? 'text-blue-500' : ''}`}
            onClick={() => setActiveTab('clubs')}
          >
            클럽 추천
          </button>
          <motion.div
            className="absolute bottom-0 h-0.5 bg-blue-500"
            initial={false}
            animate={{
              left: activeTab === 'users' ? '0%' : '50%',
              width: '50%'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'users' && (
            <Slider {...settings}>
              {users.map((user) => (
                <div key={user.userId} className="bg-gray-800 rounded-lg p-4 mx-2 mb-4 transition-all duration-200 hover:bg-gray-700 hover:shadow-lg">
                  <Link href={`/profile/${user.userId}`}>
                    <div className="flex items-center mb-3">
                      <div className={`w-12 h-12 ${user.color} rounded-full flex items-center justify-center text-xl font-bold text-white`}>
                        {user.name[0]}
                      </div>
                      <div className="ml-3">
                        <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-gray-400 text-xs truncate">@{user.username}</p>
                      </div>
                    </div>
                  </Link>
                  <button 
                    className="w-full bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Follow button clicked for user:', user.userId);
                    }}
                  >
                    팔로우
                  </button>
                </div>
              ))}
            </Slider>
          )}

          {activeTab === 'clubs' && (
            <Slider {...settings}>
              {clubs.map((club) => (
                <div key={club.id} className="bg-gray-800 rounded-lg p-4 mx-2 mb-4 transition-all duration-200 hover:bg-gray-700 hover:shadow-lg">
                  <Link href={`/clubs/${club.id}`}>
                    <div className="flex items-center mb-3">
                      <div className={`w-12 h-12 ${club.color} rounded-full flex items-center justify-center text-xl font-bold text-white`}>
                        {club.name[0]}
                      </div>
                      <div className="ml-3">
                        <p className="text-white text-sm font-semibold truncate">{club.name}</p>
                      </div>
                    </div>
                  </Link>
                  <button 
                    className="w-full bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Join club button clicked');
                    }}
                  >
                    가입하기
                  </button>
                </div>
              ))}
            </Slider>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Recommendations;
