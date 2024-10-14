import React from 'react';

interface ClubActivityFeedProps {
  clubId: string;
}

const ClubActivityFeed: React.FC<ClubActivityFeedProps> = ({ clubId }) => {
  return (
    <div>
      <h2>클럽 활동 내역 - 클럽 ID: {clubId}</h2>
      {/* 여기에 클럽 활동 내역 구현 */}
      {/* 예: 최근 이벤트, 멤버 활동, 공지사항 등 */}
    </div>
  );
};

export default ClubActivityFeed;