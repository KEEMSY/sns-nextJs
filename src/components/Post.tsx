import { FaHeart, FaComment, FaRetweet } from 'react-icons/fa'

type PostProps = {
  post: {
    id: number
    content: string
    author: {
      name: string
      username: string
    }
    timestamp: string
    likes: number
    comments: number
    reposts: number
  }
}

export default function Post({ post }: PostProps) {
  return (
    <div className="border-b border-gray-800 py-4">
      <div className="flex items-start mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
        <div>
          <span className="font-bold">{post.author.name}</span>
          <span className="text-gray-500 ml-2">@{post.author.username}</span>
          <span className="text-gray-500 ml-2">·</span>
          <span className="text-gray-500 ml-2">{post.timestamp}</span>
        </div>
      </div>
      <p className="mb-2">{post.content}</p>
      <div className="flex space-x-4 text-gray-500">
        <button className="flex items-center space-x-1">
          <FaHeart />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center space-x-1">
          <FaComment />
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center space-x-1">
          <FaRetweet />
          <span>{post.reposts}</span>
        </button>
      </div>
    </div>
  )
}