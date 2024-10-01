import React, { useState } from 'react';
import Slider from 'react-slick';

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
    <div className="bg-[#1e1e1e] rounded-xl p-4 my-4 shadow-lg">
      
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
            <div key={user.id} className="bg-gray-800 rounded-lg p-3 flex items-center transition-transform transform hover:scale-105 mx-2">
              <div className={`w-12 h-12 ${user.color} rounded-full flex items-center justify-center text-xl font-bold text-white mr-3`}>
                {user.name[0]}
                
              </div>
              <div className="flex flex-col">
                <p className="text-white text-sm font-semibold text-center truncate">{user.name}</p>
                <p className="text-gray-400 text-xs text-center truncate">@{user.username}</p>
                <button className="bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-full hover:bg-blue-600 transition duration-200 mt-1">
                  팔로우
                </button>
              </div>
            </div>
          ))}
        </Slider>
      )}

      {activeTab === 'clubs' && (
        <Slider {...settings}>
          {clubs.map((club) => (
            <div key={club.id} className="bg-gray-800 rounded-lg p-3 flex items-center transition-transform transform hover:scale-105 mx-2">
              <div className={`w-12 h-12 ${club.color} rounded-full flex items-center justify-center text-xl font-bold text-white mr-3`}>
                {club.name[0]}
              </div>
              <div className="flex flex-col">
                <p className="text-white text-sm font-semibold text-center truncate">{club.name}</p>
                <p className="text-gray-400 text-xs text-center truncate">@{club.clubName}</p>
                <button className="bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-full hover:bg-blue-600 transition duration-200 mt-1">
                  가입
                </button>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Recommendations;