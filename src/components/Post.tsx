import Link from 'next/link';
import { FaComment, FaHeart, FaRetweet, FaBookmark } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';

interface PostProps {
  post: {
    id: string;
    author: {
      userId: string;
      name: string;
      username: string;
      color: string;
      isVerified: boolean;
    };
    content: string;
    createdAt: string;
    createdAtFormatted: string;
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
        <div className="flex-grow">
          <div className="flex items-center">
            <Link href={`/profile/${post.author.userId}`}>
              <h3 className="font-bold text-white hover:underline mr-2">{post.author.name}</h3>
            </Link>
            {post.author.isVerified && (
              <div className="mr-2 flex items-center gap-1">
                <p className="text-gray-500 text-sm">@{post.author.username}</p>
                <BsCheckCircleFill 
                  className="text-blue-500 drop-shadow-[0_2px_4px_rgba(59,130,246,0.4)]" 
                  size={16} 
                  title="인증된 계정"
                />
              </div>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-1">{post.createdAtFormatted}</p>
        </div>
      </div>
      <p className="text-white mb-4">{post.content}</p>
      <div className="flex justify-center space-x-12 text-gray-500 mt-9">
        <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200">
          <FaComment className="text-lg" />
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500 transition-colors duration-200">
          <FaRetweet className="text-lg" />
          <span>{post.reposts}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-red-500 transition-colors duration-200">
          <FaHeart className="text-lg" />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center hover:text-blue-500 transition-colors duration-200">
          <FaBookmark className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Post;