'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Post from './Post'
import { dummyPosts } from '../lib/dummyData'
import { FaImage, FaGift, FaPoll, FaSmile } from 'react-icons/fa'

export default function Feed() {
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState<typeof dummyPosts>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

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
    }, 1000) // 1초 지연을 주어 로딩 효과를 시뮬레이션합니다.
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New post:', newPost)
    setNewPost('')
  }

  return (
    <div className="h-full overflow-y-auto hide-scrollbar">
      <div className="p-4 border-b border-gray-800 bg-[#1a1a1a]">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="무슨 일이 일어나고 있나요?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full bg-transparent text-white placeholder-gray-500 outline-none mb-2"
          />
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 text-blue-400">
              <button type="button"><FaImage /></button>
              <button type="button"><FaGift /></button>
              <button type="button"><FaPoll /></button>
              <button type="button"><FaSmile /></button>
            </div>
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold"
              disabled={!newPost.trim()}
            >
              게시하기
            </button>
          </div>
        </form>
      </div>
      <div>
        {posts.map((post, index) => (
          <div key={post.id} ref={index === posts.length - 1 ? lastPostElementRef : null}>
            <Post post={post} />
          </div>
        ))}
        {loading && <div className="text-center p-4">Loading...</div>}
      </div>
    </div>
  )
}