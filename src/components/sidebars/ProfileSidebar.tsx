import Image from 'next/image';
import { dummyUsers } from '@/lib/dummyData';
import { User } from '@/types';

const ProfileSidebar = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">추천 유저</h2>
      {dummyUsers.slice(0, 5).map((user: User) => (
        <div key={user.userId} className="flex items-center gap-3 mb-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <Image
              src={user.avatar}
              alt={user.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-400">@{user.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileSidebar;
