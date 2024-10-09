'use client';

import { useState } from 'react';
import { FaUser, FaHeart, FaComment, FaRetweet } from 'react-icons/fa';
import Layout from '../../components/Layout';
import { dummyNotifications, Notification } from '../../lib/dummyData';
import Link from 'next/link';

export default function NotificationsPage() {
  const [notifications] = useState<Notification[]>(dummyNotifications);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'follow': return <FaUser className="text-blue-500" />;
      case 'like': return <FaHeart className="text-red-500" />;
      case 'comment': return <FaComment className="text-green-500" />;
      case 'repost': return <FaRetweet className="text-purple-500" />;
    }
  };

  const getNotificationLink = (notification: Notification) => {
    switch (notification.type) {
      case 'follow':
        return `/profile/${notification.userId}`;
      case 'like':
      case 'comment':
      case 'repost':
        return notification.targetPostId ? `/post/${notification.targetPostId}` : '#';
      default:
        return '#';
    }
  };

  return (
    <Layout title="알림">
      <div className="p-4 max-w-lg mx-auto">
        {notifications.length > 0 ? (
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li key={notification.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link href={getNotificationLink(notification)}>
                  <div className="flex items-start space-x-3 p-4 cursor-pointer hover:bg-gray-700 transition-colors duration-200">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm text-gray-200">
                        <Link 
                          href={`/profile/${notification.userId}`} 
                          className="font-semibold text-white hover:text-blue-400 transition-colors duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {notification.user}
                        </Link>
                        {notification.content}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">새로운 알림이 없습니다.</p>
        )}
      </div>
    </Layout>
  );
}