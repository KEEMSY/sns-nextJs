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
          <div className="mb-4 bg-[#1a1a1a] rounded-full flex items-center p-2">
            <input
              type="text"
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-white placeholder-gray-500 outline-none px-2"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </form>
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar mb-4">
          {searchOptions.map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedOption === option
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#1a1a1a] text-gray-300'
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