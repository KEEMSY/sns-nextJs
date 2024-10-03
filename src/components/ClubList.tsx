import React from 'react';
import Link from 'next/link';
import Club from './Club';

interface ClubData {
  id: string;
  name: string;
  color: string;
}

const dummyClubs: ClubData[] = [
  { id: '1', name: 'BTS', color: 'bg-purple-500' },
  { id: '2', name: 'BLACKPINK', color: 'bg-pink-500' },
  { id: '3', name: 'EXO', color: 'bg-blue-500' },
  { id: '4', name: 'TWICE', color: 'bg-yellow-500' },
  { id: '5', name: 'NCT', color: 'bg-green-500' },
];

const ClubList: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <h2 className="text-xl font-bold p-4">클럽</h2>
      <div className="flex overflow-x-auto hide-scrollbar pb-4">
        {dummyClubs.map((club) => (
          <Link key={club.id} href={`/club/${club.id}`} className="flex-shrink-0">
            <Club {...club} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClubList;