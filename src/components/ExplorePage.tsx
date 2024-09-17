import ExploreSection from '../components/ExploreSection'
import TrendingPosts from '../components/TrendingPosts'

export default function ExplorePage() {
  return (
    <div className="flex space-x-4">
      <div className="flex-grow max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">탐색하기</h1>
        <TrendingPosts />
      </div>
      <div className="hidden lg:block w-80">
        <ExploreSection />
      </div>
    </div>
  )
}