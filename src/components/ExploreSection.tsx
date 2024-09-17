'use client'

import { FaHashtag, FaChartLine } from 'react-icons/fa'

const demoTrendingTopics = [
  { id: 1, hashtag: 'TechNews', postCount: 5420 },
  { id: 2, hashtag: 'CodingLife', postCount: 3210 },
  { id: 3, hashtag: 'AIRevolution', postCount: 2800 },
  { id: 4, hashtag: 'ClimateAction', postCount: 1980 },
  { id: 5, hashtag: 'HealthyLiving', postCount: 1650 },
]

export default function ExploreSection() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <FaChartLine className="mr-2" />
        트렌딩 토픽
      </h2>
      <ul className="space-y-3">
        {demoTrendingTopics.map((topic) => (
          <li key={topic.id} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded transition duration-200">
            <div className="flex items-center">
              <FaHashtag className="text-blue-400 mr-2" />
              <span className="text-gray-800 font-medium">{topic.hashtag}</span>
            </div>
            <span className="text-sm text-gray-500">{topic.postCount} 게시물</span>
          </li>
        ))}
      </ul>
    </div>
  )
}