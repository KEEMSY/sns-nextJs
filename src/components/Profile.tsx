'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ProfilePage from '@/components/ProfilePage'
import Feed from '@/components/Feed'

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  const user = {
    name: session.user?.name || '사용자',
    username: session.user?.email?.split('@')[0] || 'username',
    bio: '웹 개발자 | 커피 애호가 🍵 | 여행 좋아함 ✈️ | 여행 중 아이디어가 🌟',
    location: '서울, 대한민국',
    website: 'example.com',
    joinDate: '2021년 3월 가입',
    followers: 567,
    following: 1234
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <ProfilePage user={user} />
      <Feed />
    </div>
  )
}