'use client';

import Feed from '../components/Feed'
import Layout from '../components/Layout'

const feedOptions = ['회원님을 위한 추천', '팔로잉', '좋아요', '저장됨'];

export default function Home() {
  return (
    <Layout 
      title="회원님을 위한 추천" 
      showBackButton={false}
      showToggle={true}
      options={feedOptions}
    >
      <Feed />
    </Layout>
  )
}