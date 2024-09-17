import { FaSearch } from 'react-icons/fa'

export default function RightSidebar() {
  return (
    <aside className="w-80 p-4 bg-gray-50">
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="검색"
            className="w-full bg-gray-100 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <h2 className="font-bold text-xl mb-2 text-gray-900">프리미엄 구독하기</h2>
        <p className="mb-2 text-sm text-gray-700">새로운 기능을 이용하고, 조건에 맞다면 광고 수익 일부를 받아보세요.</p>
        <button className="bg-green-500 text-white rounded-full px-4 py-2 font-bold text-sm hover:bg-green-600 transition duration-200">
          구독하기
        </button>
      </div>
      <div className="bg-gray-100 rounded-lg p-4">
        <h2 className="font-bold text-xl mb-4 text-gray-900">트렌드</h2>
        <TrendingTopic topic="사촌동생" posts="12.1K" />
        <TrendingTopic topic="노진지 우승" posts="5,729" />
        <TrendingTopic topic="실내흡연" posts="16.1K" />
        <TrendingTopic topic="#데릴랜드_떡이당" posts="1,104" />
        <TrendingTopic topic="#남우현" posts="5,729" />
        <a href="#" className="text-green-500 hover:text-green-700 transition duration-200 text-sm">더 보기</a>
      </div>
    </aside>
  )
}

function TrendingTopic({ topic, posts }: { topic: string; posts: string }) {
  return (
    <div className="mb-4 hover:bg-gray-200 p-2 rounded transition duration-200 cursor-pointer">
      <p className="text-gray-500 text-xs">대한민국에서 트렌드 중</p>
      <p className="font-bold text-sm text-gray-900">{topic}</p>
      <p className="text-gray-500 text-xs">{posts} 게시물</p>
    </div>
  )
}