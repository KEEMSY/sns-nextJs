'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Post from './Post'
import Recommendations from './Recommendations'
import { dummyPosts, dummyUsers, dummyClubs } from '../lib/dummyData'
import { FaImage, FaGift, FaPoll, FaSmile } from 'react-icons/fa'
import Link from 'next/link'

const POSTS_PER_PAGE = 10;

export default function Feed() {
  const [newPost, setNewPost] = useState('')
  const [displayedPosts, setDisplayedPosts] = useState<typeof dummyPosts>([])
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
      const newPosts = dummyPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
      setDisplayedPosts(prevPosts => [...prevPosts, ...newPosts])
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
        {displayedPosts.map((post, index) => (
          <React.Fragment key={post.id}>
            <Link href={`/post/${post.id}`} passHref>
              <div className="cursor-pointer">
                <Post post={post} />
              </div>
            </Link>
            {recommendations[Math.floor(index / 30)] && (index + 1) % 30 === 0 && (
              <Recommendations {...recommendations[Math.floor(index / 30)]} />
            )}
            {index === displayedPosts.length - 1 && (
              <div ref={lastPostElementRef}></div>
            )}
          </React.Fragment>
        ))}
        {loading && <div className="text-center p-4">Loading...</div>}
      </div>
    </div>
  )
}