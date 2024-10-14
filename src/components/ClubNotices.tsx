import React from 'react';
import { dummyClubNotices, ClubNotice } from '../lib/dummyData';

interface ClubNoticesProps {
  clubId: string;
}

const ClubNotices: React.FC<ClubNoticesProps> = ({ clubId }) => {
  const clubNotices = dummyClubNotices.filter(notice => notice.clubId === clubId);

  return (
    <div className="space-y-4">
      {clubNotices.length > 0 ? (
        clubNotices.map((notice: ClubNotice) => (
          <div key={notice.id} className="bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-white">{notice.title}</h3>
            <p className="text-gray-300 mb-2">{notice.content}</p>
            <div className="text-sm text-gray-400">
              <span>{notice.author.name}</span> ·{' '}
              <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">현재 등록된 공지사항이 없습니다.</p>
      )}
    </div>
  );
};

export default ClubNotices;
