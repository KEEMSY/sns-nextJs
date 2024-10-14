import React from 'react';
import { dummyClubPosts, ClubPost } from '../lib/dummyData';

interface ClubPostListProps {
  clubId: string;
}

const ClubPostList: React.FC<ClubPostListProps> = ({ clubId }) => {
  const clubPosts = dummyClubPosts.filter(post => post.clubId === clubId);

  return (
    <div className="space-y-4">
      {clubPosts.length > 0 ? (
        clubPosts.map((post: ClubPost) => (
          <div key={post.id} className="bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-white mb-2">{post.content}</p>
            <div className="text-sm text-gray-400">
              <span>{post.author.name}</span> ·{' '}
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <span>좋아요 {post.likes}</span> · <span>댓글 {post.comments}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">현재 등록된 게시물이 없습니다.</p>
      )}
    </div>
  );
};

export default ClubPostList;
