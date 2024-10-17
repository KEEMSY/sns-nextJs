'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaHeart, FaComment, FaRetweet, FaBookmark, FaRegComment, FaRegHeart, FaRegBookmark } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'
import Layout from './Layout'
import { dummyPosts, dummyComments } from '../lib/dummyData'

interface Post {
  id: string;
  author: {
    userId: string;
    name: string;
    username: string;
    color: string;
  };
  content: string;
  createdAt: string;
  createdAtFormatted: string;
  likes: number;
  comments: number;
  reposts: number;
}

interface Comment {
  id: string;
  author: {
    userId: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  postId: string;
}

export default function PostDetail({ postId }: { postId: string }) {
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const foundPost = dummyPosts.find(p => p.id === postId)
    if (foundPost) {
      setPost(foundPost)
    }

    if (Array.isArray(dummyComments)) {
      const filteredComments = dummyComments.filter(c => c.postId === postId)
      setComments(filteredComments)
    } else {
      console.error('dummyComments is not an array:', dummyComments)
      setComments([])
    }
  }, [postId])

  if (!post) return <div className="flex justify-center items-center h-full">Loading...</div>

  const additionalContent = (
    <span className="text-gray-500 text-sm">조회 4.3천회</span>
  )

  return (
    <Layout 
      title="스레드"
      additionalContent={additionalContent}
    >
      <article className="p-4 border-b border-gray-800">
        <div className="flex items-start mb-4">
          <Link href={`/profile/${post.author.userId}`} className="flex items-start">
            <div className={`w-12 h-12 rounded-full mr-4 ${post.author.color}`}></div>
            <div>
              <h2 className="font-bold text-white hover:underline">{post.author.name}</h2>
              <p className="text-gray-500">@{post.author.username}</p>
            </div>
          </Link>
        </div>
        <p className="text-white mb-2">{post.content}</p>
        <p className="text-gray-500 text-sm mb-4">{post.createdAtFormatted}</p>
        <div className="flex justify-between items-center mt-4 px-2">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
            <FaRegComment className="text-xl" />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button 
            className={`flex items-center space-x-2 transition-colors duration-200 ${isReposted ? 'text-green-500' : 'text-gray-500 hover:text-green-500'}`}
            onClick={() => setIsReposted(!isReposted)}
          >
            <FaRetweet className="text-xl" />
            <span className="text-sm">{isReposted ? post.reposts + 1 : post.reposts}</span>
          </button>
          <button 
            className={`flex items-center space-x-2 transition-colors duration-200 ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
            <span className="text-sm">{isLiked ? post.likes + 1 : post.likes}</span>
          </button>
          <button 
            className={`flex items-center transition-colors duration-200 ${isBookmarked ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            {isBookmarked ? <FaBookmark className="text-xl" /> : <FaRegBookmark className="text-xl" />}
          </button>
        </div>
      </article>
      <section className="p-4">
        <h2 className="font-bold mb-4">답글</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4 pb-4 border-b border-gray-800">
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
                  <span className="text-gray-500 text-sm">{comment.likes}</span>
                  <FaComment className="text-gray-500" />
                  <FaRetweet className="text-gray-500" />
                  <FaBookmark className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  )
}
