'use client'

import React from 'react';
import Link from 'next/link';

interface ClubProps {
  id: string;
  name: string;
  color: string;
}

const Club: React.FC<ClubProps> = ({ id, name, color }) => {
  return (
    <Link href={`/clubs/${id}`} className="block">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${color} text-white`}>
          {name[0]}
        </div>
        <h3 className="ml-3 text-lg font-bold text-white">{name}</h3>
      </div>
    </Link>
  );
};

export default Club;