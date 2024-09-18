'use client';

import { useState, useEffect } from 'react'
import { FaArrowLeft, FaHeart, FaComment, FaRetweet, FaBookmark } from 'react-icons/fa'
import Link from 'next/link'
import { dummyPosts } from '../lib/dummyData'
import { BsThreeDots } from 'react-icons/bs'
interface Post {
  id: string
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  image?: string
  createdAt: string
  likes: number
  comments: number
  reposts: number
}

interface Comment {
  id: string
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  createdAt: string
  likes: number
}

export default function PostDetail({ postId }: { postId: string }) {
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    // 더미 데이터에서 해당 ID의 게시물 찾기
    const foundPost = dummyPosts.find(p => p.id.toString() === postId)
    if (foundPost) {
      setPost({
        id: foundPost.id.toString(),
        author: {
          name: foundPost.author.name,
          username: foundPost.author.username,
          avatar: 'https://via.placeholder.com/40' // 더미 데이터에 avatar가 없으므로 임의로 추가
        },
        content: foundPost.content,
        createdAt: foundPost.timestamp,
        likes: foundPost.likes,
        comments: foundPost.comments,
        reposts: foundPost.reposts
      })
    }

    // 댓글은 여전히 하드코딩된 더미 데이터 사용
    setComments([
      {
        id: '1',
        author: {
          name: '1one__999',
          username: '1one__999',
          avatar: 'https://via.placeholder.com/40'
        },
        content: '회오열에서 사출되기 엔 도오히어야 저 양반은',
        createdAt: '5시간',
        likes: 149
      },
      // 더 많은 댓글 추가...
    ])
  }, [postId])

  if (!post) return <div>Loading...</div>

  return (
    <div className="max-w-xl mx-auto bg-black min-h-screen text-white flex flex-col">
      <header className="sticky top-0 bg-black/80 backdrop-blur-sm z-10">
        <div className="px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-white">
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">스레드</h1>
          <BsThreeDots size={20} />
        </div>
        <div className="px-4 py-1 text-center">
          <span className="text-gray-500 text-sm">조회 4.3천회</span>
        </div>
      </header>
      <main className="flex-1 relative">
        <div className="absolute inset-x-0 top-0 bottom-0 bg-[#101010] rounded-t-[2rem]">
          <div className="h-full overflow-y-auto">
            <article className="p-4 border-b border-gray-800">
              <div className="flex items-start mb-4">
                <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h2 className="font-bold text-white">{post.author.name}</h2>
                  <p className="text-gray-500">@{post.author.username}</p>
                </div>
              </div>
              <p className="text-white mb-4">{post.content}</p>
              {post.image && <img src={post.image} alt="Post image" className="w-full rounded-xl mb-4" />}
              <div className="flex items-center text-gray-500 mb-4">
                <span>{post.createdAt}</span>
              </div>
              <div className="flex items-center text-gray-500 border-t border-gray-800 py-2">
                <span className="mr-4">{post.comments} 답글</span>
                <span className="mr-4">{post.likes} 좋아요</span>
                <span>{post.reposts} 북마크</span>
              </div>
              <div className="flex justify-around py-2 border-t border-b border-gray-800">
                <button className="text-gray-500 hover:text-blue-500"><FaComment /></button>
                <button className="text-gray-500 hover:text-green-500"><FaRetweet /></button>
                <button className="text-gray-500 hover:text-red-500"><FaHeart /></button>
                <button className="text-gray-500 hover:text-blue-500"><FaBookmark /></button>
              </div>
            </article>
            <section className="p-4">
              <h2 className="font-bold mb-4">답글</h2>
              {comments.map((comment, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-gray-800">
                  <div className="flex items-start">
                    <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full mr-3" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold">{comment.author.name}</h3>
                        <div className="flex items-center">
                          <span className="text-gray-500 text-sm mr-2">{comment.createdAt}</span>
                          <BsThreeDots size={16} />
                        </div>
                      </div>
                      <p className="text-sm mb-2">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <FaHeart className="text-gray-500" />
                        <FaComment className="text-gray-500" />
                        <FaRetweet className="text-gray-500" />
                        <FaBookmark className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}