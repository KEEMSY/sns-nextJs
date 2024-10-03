'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';

// Define the type for clubData
type ClubData = {
  id: string;
  name: string;
  color: string;
  memberCount: number;
  description: string;
};

const dummyClubs: ClubData[] = [
  { id: '1', name: 'BTS', color: 'bg-purple-500', memberCount: 30000000, description: 'BTS 팬클럽' },
  { id: '2', name: 'BLACKPINK', color: 'bg-pink-500', memberCount: 25000000, description: 'BLACKPINK 팬클럽' },
  { id: '3', name: 'EXO', color: 'bg-blue-500', memberCount: 20000000, description: 'EXO 팬클럽' },
  { id: '4', name: 'TWICE', color: 'bg-yellow-500', memberCount: 18000000, description: 'TWICE 팬클럽' },
  { id: '5', name: 'NCT', color: 'bg-green-500', memberCount: 15000000, description: 'NCT 팬클럽' },
  { id: '6', name: 'Red Velvet', color: 'bg-red-500', memberCount: 12000000, description: 'Red Velvet 팬클럽' },
  { id: '7', name: 'SEVENTEEN', color: 'bg-indigo-500', memberCount: 10000000, description: 'SEVENTEEN 팬클럽' },
  { id: '8', name: 'ITZY', color: 'bg-orange-500', memberCount: 8000000, description: 'ITZY 팬클럽' },
];

const ClubDetail = () => {
  const params = useParams();
  const [club, setClub] = useState<ClubData | null>(null);

  useEffect(() => {
    const id = params.id as string;
    const foundClub = dummyClubs.find(c => c.id === id);
    if (foundClub) {
      setClub(foundClub);
    }
  }, [params]);

  if (!club) {
    return <Layout title="로딩 중..."><div className="p-4">로딩 중...</div></Layout>;
  }

  return (
    <Layout title={club.name}>
      <div className="p-4">
        <div className={`${club.color} w-full h-40 rounded-t-lg`}></div>
        <div className="bg-gray-800 rounded-b-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{club.name}</h1>
          <p className="text-xl text-gray-300 mb-4">{club.description}</p>
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xl text-gray-300">멤버: {club.memberCount.toLocaleString()}</span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            클럽 가입하기
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ClubDetail;