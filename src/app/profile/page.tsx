'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SignUpModal from '../../components/SignUpModal';

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 여기서 실제 로그인 상태를 확인합니다.
    // 예를 들어, 로컬 스토리지나 쿠키를 확인하거나 API 요청을 보낼 수 있습니다.
    const checkLoginStatus = () => {
      // 임시로 로그인 상태를 false로 설정
      setIsLoggedIn(false);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <SignUpModal
        isOpen={isModalOpen}
        onClose={() => router.push('/')}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div>
      <h1>마이페이지</h1>
      {/* 마이페이지 내용 */}
    </div>
  );
}