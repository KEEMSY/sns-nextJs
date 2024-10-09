import Link from 'next/link';
import { FaComment, FaHeart, FaRetweet, FaBookmark } from 'react-icons/fa';

interface PostProps {
  post: {
    id: string;
    author: {
      userId: string;
      name: string;
      username: string;
      color: string;
    };
    content: string;
    createdAt: string;
    likes: number;
    comments: number;
    reposts: number;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="border-b border-gray-800 p-4">
      <div className="flex items-start mb-2">
        <Link href={`/profile/${post.author.userId}`}>
          <div className={`w-10 h-10 ${post.author.color} rounded-full flex items-center justify-center text-white font-bold mr-3`}>
            {post.author.name[0]}
          </div>
        </Link>
        <div>
          <Link href={`/profile/${post.author.userId}`}>
            <h3 className="font-bold text-white hover:underline">{post.author.name}</h3>
          </Link>
          <p className="text-gray-500">@{post.author.username}</p>
        </div>
      </div>
      <p className="text-white mb-2">{post.content}</p>
      <p className="text-gray-500 mb-2">{post.createdAt}</p>
      <div className="flex justify-between text-gray-500">
        <span><FaComment className="inline mr-1" /> {post.comments}</span>
        <span><FaRetweet className="inline mr-1" /> {post.reposts}</span>
        <span><FaHeart className="inline mr-1" /> {post.likes}</span>
        <FaBookmark />
      </div>
    </div>
  );
};

export default Post;