import React, { useState } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';

interface User {
  id: string;
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

  return (
    <div className="bg-[#1e1e1e] rounded-xl p-4 my-4 shadow-lg" style={{ margin: '10px 15px' }}>
                   
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`text-white font-semibold ${activeTab === 'users' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          사용자 추천
        </button>
        <button
          className={`text-white font-semibold ${activeTab === 'clubs' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('clubs')}
        >
          클럽 추천
        </button>
      </div>

      {activeTab === 'users' && (
        <Slider {...settings}>
          {users.map((user) => (
            <Link key={user.id} href={`/profile/${user.username}`}>
              <div className="bg-gray-800 rounded-lg p-4 mx-2 mb-4 transition-all duration-200 hover:bg-gray-700 hover:shadow-lg">
                <div className="flex items-center mb-3">
                  <div className={`w-12 h-12 ${user.color} rounded-full flex items-center justify-center text-xl font-bold text-white`}>
                    {user.name[0]}
                  </div>
                  <div className="ml-3">
                    <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                    <p className="text-gray-400 text-xs truncate">@{user.username}</p>
                  </div>
                </div>
                <button 
                  className="w-full bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Follow button clicked');
                  }}
                >
                  팔로우
                </button>
              </div>
            </Link>
          ))}
        </Slider>
      )}

      {activeTab === 'clubs' && (
        <Slider {...settings}>
          {clubs.map((club) => (
            <Link key={club.id} href={`/clubs/${club.id}`}>
              <div className="bg-gray-800 rounded-lg p-4 mx-2 mb-4 transition-all duration-200 hover:bg-gray-700 hover:shadow-lg">
                <div className="flex items-center mb-3">
                  <div className={`w-12 h-12 ${club.color} rounded-full flex items-center justify-center text-xl font-bold text-white`}>
                    {club.name[0]}
                  </div>
                  <div className="ml-3">
                    <p className="text-white text-sm font-semibold truncate">{club.name}</p>
                    <p className="text-gray-400 text-xs truncate">@{club.clubName}</p>
                  </div>
                </div>
                <button 
                  className="w-full bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Join button clicked');
                  }}
                >
                  가입
                </button>
              </div>
            </Link>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Recommendations;