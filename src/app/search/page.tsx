/*
 * 개선해야할 사항
 * - 디자인 수정(로그인이 되었을 때, 로그인이 되지 않았을 때)
 *   - UI UX 측면의 개선도 고려 필요
 * - 벡엔드 실제 데이터 연동
 */

'use client'

import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

// 더미 데이터 생성 함수
const generateDummyResults = (searchTerm: string) => {
  const dummyData = [
    '트위터 클론 코딩하기',
    '넥스트js로 웹 개발하기',
    '리액트 훅스 마스터하기',
    '타입스크립트 기초 배우기',
    '테일윈드 CSS 활용하기'
  ]
  
  return dummyData.filter(item => 
    item.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 더미 데이터로 검색 결과 생성
    const results = generateDummyResults(searchTerm)
    setSearchResults(results)
    setHasSearched(true)
  }

  return (
    <div className="ml-16 p-4">
      <h1 className="text-2xl font-bold mb-6">검색</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </form>
      {hasSearched && (
        <div>
          <h2 className="text-xl font-semibold mb-4">검색 결과</h2>
          {searchResults.length > 0 ? (
            <ul className="space-y-4">
              {searchResults.map((result, index) => (
                <li key={index} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-200">
                  {result}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">검색 결과가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  )
}