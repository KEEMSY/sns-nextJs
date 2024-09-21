'use client'

import { useState } from 'react'
import Post from './Post'
import { dummyPosts } from '../lib/dummyData'
import { FaImage, FaGift, FaPoll, FaSmile } from 'react-icons/fa'

export default function Feed() {
  const [newPost, setNewPost] = useState('')

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
        {dummyPosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}