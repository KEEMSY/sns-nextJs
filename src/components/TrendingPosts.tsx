import Post from './Post'

const demoTrendingPosts = [
  {
    id: 1,
    content: '새로운 기술 트렌드에 대해 알아보세요! #AI #MachineLearning',
    author: { name: '테크 엔서시아스트', username: 'tech_enthusiast' },
    timestamp: '3시간 전',
    likes: 1200,
    comments: 89,
    reposts: 245
  },
  {
    id: 2,
    content: '오늘의 주식 시장 동향: 신기록 달성! #주식 #투자',
    author: { name: '주식 마스터', username: 'stock_master' },
    timestamp: '5시간 전',
    likes: 980,
    comments: 132,
    reposts: 178
  },
  {
    id: 3,
    content: '새로운 영화 "우주의 끝"이 박스오피스 1위를 차지했습니다. #영화 #엔터테인먼트',
    author: { name: '영화 평론가', username: 'movie_critic' },
    timestamp: '7시간 전',
    likes: 1500,
    comments: 203,
    reposts: 312
  }
]

export default function TrendingPosts() {
  return (
    <div className="space-y-4">
      {demoTrendingPosts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}