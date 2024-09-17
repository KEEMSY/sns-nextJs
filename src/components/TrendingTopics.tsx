import { FaChartLine } from 'react-icons/fa'

const trendingTopics = [
  { id: 1, topic: '기술', tweets: '12.5K' },
  { id: 2, topic: '영화', tweets: '8.2K' },
  { id: 3, topic: '음악', tweets: '6.7K' },
  { id: 4, topic: '스포츠', tweets: '5.9K' },
  { id: 5, topic: '정치', tweets: '4.3K' },
]

export default function TrendingTopics() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FaChartLine className="mr-2 text-blue-500" />
        트렌딩 토픽
      </h2>
      <ul>
        {trendingTopics.map((topic) => (
          <li key={topic.id} className="mb-3 last:mb-0">
            <a href="#" className="block hover:bg-gray-50 p-2 rounded transition duration-200">
              <p className="font-medium text-gray-900">#{topic.topic}</p>
              <p className="text-sm text-gray-500">{topic.tweets} 트윗</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}