'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import Club from '../../components/Club';

interface ClubData {
  id: string;
  name: string;
  color: string;
  memberCount: number;
  description: string;
}

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

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClubs = dummyClubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="클럽 탐색">
      <div className="p-4">
        <div className="mb-4 bg-[#1a1a1a] rounded-full flex items-center p-2">
          <input
            type="text"
            placeholder="클럽 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-white placeholder-gray-500 outline-none px-2"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filteredClubs.map(club => (
            <div key={club.id} className="bg-gray-800 p-4 rounded-md">
              <Club id={club.id} name={club.name} color={club.color} />
              <p className="text-sm text-gray-400 mt-2">멤버: {club.memberCount.toLocaleString()}</p>
              <p className="text-sm text-gray-300 mt-1">{club.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}