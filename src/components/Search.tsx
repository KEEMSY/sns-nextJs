'use client';

import React, { useState } from 'react';
import Layout from './Layout';

const searchOptions = ['계정', '태그', '장소'];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(searchOptions[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm, 'in category:', selectedOption);
  };

  return (
    <Layout 
      title="검색" 
      showBackButton={true}
      showToggle={false}
    >
      <div className="p-4">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-full px-4 py-2 mb-4"
          />
        </form>
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar mb-4">
          {searchOptions.map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedOption === option
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300'
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {/* 여기에 검색 결과를 표시할 수 있습니다 */}
      </div>
    </Layout>
  );
}