'use client'

// 피드 클릭 시, 상세 페이지로 가지 않는 이슈 발생
// 피드 내 추천 영역 내 프로필 및 클럽 클릭 시, 해당 상세 페이지로 갈 수 있도록 코드 수정 필요



// 더미 포스트 데이터 추가
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Post from './Post'
import Recommendations from './Recommendations'
import { FaImage, FaGift, FaPoll, FaSmile } from 'react-icons/fa'
import Link from 'next/link';

// 더미 데이터 추가
const dummyUsers = [
  { id: '1', name: '김철수', username: 'chulsoo', color: 'bg-red-500' },
  { id: '2', name: '이영희', username: 'younghee', color: 'bg-blue-500' },
  { id: '3', name: '박지성', username: 'jisung', color: 'bg-green-500' },
  { id: '4', name: '최민수', username: 'minsu', color: 'bg-yellow-500' },
  { id: '5', name: '정소연', username: 'soyeon', color: 'bg-purple-500' },
];

const dummyClubs = [
  { id: '1', name: 'BTS', color: 'bg-purple-500', clubName: 'BTS' },
  { id: '2', name: 'BLACKPINK', color: 'bg-pink-500', clubName: 'BLACKPINK' },
  { id: '3', name: 'EXO', color: 'bg-blue-500', clubName: 'EXO' },
  { id: '4', name: 'TWICE', color: 'bg-yellow-500', clubName: 'TWICE' },
  { id: '5', name: 'NCT', color: 'bg-green-500', clubName: 'NCT' },
];

// 더미 포스트 데이터 추가
const dummyPosts = Array.from({ length: 100 }, (_, i) => ({
  id: `post-${i + 1}`,
  content: `이것은 더미 포스트 ${i + 1}입니다.`,
  author: dummyUsers[Math.floor(Math.random() * dummyUsers.length)],
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  likes: Math.floor(Math.random() * 100),
  comments: Math.floor(Math.random() * 20),
}));

export default function Feed() {
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState<typeof dummyPosts>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [loadCount, setLoadCount] = useState(0)
  const [recommendations, setRecommendations] = useState<Array<{users: typeof dummyUsers, clubs: typeof dummyClubs}>>([])

  const observer = useRef<IntersectionObserver | null>(null)
  const lastPostElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts()
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  useEffect(() => {
    loadMorePosts()
  }, [])

  const loadMorePosts = () => {
    setLoading(true)
    setTimeout(() => {
      const newPosts = dummyPosts.slice((page - 1) * 10, page * 10)
      setPosts(prevPosts => [...prevPosts, ...newPosts])
      setPage(prevPage => prevPage + 1)
      setHasMore(newPosts.length > 0)
      setLoading(false)
      setLoadCount(prevCount => {
        const newCount = prevCount + 1
        if (newCount % 3 === 0) {
          setRecommendations(prev => [...prev, getRandomRecommendations()])
        }
        return newCount
      })
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New post:', newPost)
    setNewPost('')
  }

  const getRandomRecommendations = () => {
    const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);
    const users = shuffleArray([...dummyUsers]).slice(0, 3);
    const clubs = shuffleArray([...dummyClubs]).slice(0, 2);
    return { users, clubs };
  };

  return (
    <div className="h-full overflow-y-auto hide-scrollbar">
      <div className="p-4 bg-[#121212]">
        <form onSubmit={handleSubmit}>
          <div className="bg-[#1e1e1e] rounded-2xl flex flex-col p-3">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-600 mr-3"></div>
              <input
                type="text"
                placeholder="새로운 소식이 있나요?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="flex-grow bg-transparent text-white placeholder-gray-500 outline-none"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4 text-gray-400">
                <button type="button" className="hover:text-blue-400 transition duration-200"><FaImage /></button>
                <button type="button" className="hover:text-blue-400 transition duration-200"><FaGift /></button>
                <button type="button" className="hover:text-blue-400 transition duration-200"><FaPoll /></button>
                <button type="button" className="hover:text-blue-400 transition duration-200"><FaSmile /></button>
              </div>
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                disabled={!newPost.trim()}
              >
                게시
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {posts.map((post, index) => (
          <React.Fragment key={post.id}>
            <Link href={`/post/${post.id.replace('post-', '')}`} passHref>
              <div className="cursor-pointer">
                <Post post={{...post, id: Number(post.id.replace('post-', '')), timestamp: post.createdAt, reposts: 0}} />
              </div>
            </Link>
            {recommendations[Math.floor(index / 30)] && (index + 1) % 30 === 0 && (
              <Recommendations {...recommendations[Math.floor(index / 30)]} />
            )}
            {index === posts.length - 1 && (
              <div ref={lastPostElementRef}></div>
            )}
          </React.Fragment>
        ))}
        {loading && <div className="text-center p-4">Loading...</div>}
      </div>
    </div>
  )
}