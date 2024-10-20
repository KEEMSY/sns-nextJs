'use client';

import { useParams } from 'next/navigation';
import ProfileDetail from '../../../components/ProfileDetail';

export default function ProfilePage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    return <div>Invalid profile ID</div>;
  }

  return <ProfileDetail userId={id} />;
}
