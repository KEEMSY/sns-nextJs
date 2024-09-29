import React from 'react';

interface User {
  id: string;
  name: string;
  username: string;
  color: string;
}

interface Club {
  id: string;
  name: string;
  color: string;
}

interface RecommendationsProps {
  users: User[];
  clubs: Club[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ users, clubs }) => {
  return (
    <div className="bg-[#1e1e1e] rounded-xl p-4 my-4">
      <h2 className="text-white text-lg font-bold mb-4">회원님을 위한 추천</h2>
      <div className="flex overflow-x-auto hide-scrollbar pb-2">
        {users.map((user) => (
          <div key={user.id} className="flex-shrink-0 w-24 mr-4">
            <div className={`w-16 h-16 ${user.color} rounded-full flex items-center justify-center text-2xl font-bold text-white mb-2`}>
              {user.name[0]}
            </div>
            <p className="text-white text-sm font-semibold truncate">{user.name}</p>
            <p className="text-gray-400 text-xs truncate">@{user.username}</p>
            <button className="mt-2 bg-white text-black text-xs font-bold py-1 px-3 rounded-full">
              팔로우
            </button>
          </div>
        ))}
        {clubs.map((club) => (
          <div key={club.id} className="flex-shrink-0 w-24 mr-4">
            <div className={`w-16 h-16 ${club.color} rounded-full flex items-center justify-center text-2xl font-bold text-white mb-2`}>
              {club.name[0]}
            </div>
            <p className="text-white text-sm font-semibold truncate">{club.name}</p>
            <button className="mt-2 bg-white text-black text-xs font-bold py-1 px-3 rounded-full">
              가입
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;