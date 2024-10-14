export const dummyCurrentUser = {
  userId: '1',
  name: 'KEEMSY',
  username: 'keemsy',
  bio: '🇰🇷 웹 개발자 | 커피 애호가',
  followers: 7777,
  following: 777,
  location: '서울, 대한민국',
  website: 'keemsy.com',
  joinDate: '2020년 3월 가입',
  color: 'bg-blue-500',
  avatar: 'https://via.placeholder.com/40',
};

const baseData = [
  {
    content: '오늘 새로운 프로젝트를 시작했어요. 너무 신나요! 🚀 #코딩 #새로운시작',
    author: dummyCurrentUser,
  },
  {
    content: '맛있는 점심 먹고 왔습니다. 오늘 점심 메뉴는 비빔밥! 🍲 #맛집 #점심스타그램',
    author: { userId: 'user2', name: '김철수', username: 'chulsoo_kim', color: 'bg-green-500' },
  },
  {
    content: '새 앨범 작업 중입니다. 기대해주세요! 🎵 #음악 #신보',
    author: { userId: 'user3', name: '이영희', username: 'younghee_lee', color: 'bg-purple-500' },
  },
  {
    content: '오늘 날씨가 정말 좋네요. 산책하기 딱 좋은 날이에요. ☀️ #날씨 #산책',
    author: { userId: 'user4', name: '박지성', username: 'jisung_park', color: 'bg-yellow-500' },
  },
  {
    content: '새로운 책을 읽기 시작했어요. 추천받은 책인데 정말 재미있네요! 📚 #독서 #책추천',
    author: { userId: 'user5', name: '최민수', username: 'minsoo_choi', color: 'bg-red-500' },
  },
  {
    content: '오늘 경기 잘 마쳤습니다. 팬 여러분 응원 감사합니다! ⚽ #축구 #승리',
    author: { userId: 'user6', name: '손흥민', username: 'sonny', color: 'bg-indigo-500' },
  },
  {
    content: '새로운 프로그램 준비 중입니다. 많은 관심 부탁드려요! 🎭 #방송 #예능',
    author: { userId: 'user7', name: '김연아', username: 'yuna_kim', color: 'bg-pink-500' },
  },
  {
    content: '오늘 훈련 잘 마쳤습니다. 다음 경기 준비 열심히 하겠습니다! ⚾ #야구 #훈련',
    author: { userId: 'user8', name: '류현진', username: 'hyunjin_ryu', color: 'bg-teal-500' },
  },
  {
    content: '수영 국가대표 선발전 준비 중입니다. 응원해주세요! 🏊‍♂️ #수영 #국가대표',
    author: { userId: 'user9', name: '박태환', username: 'tae_hwan_park', color: 'bg-orange-500' },
  },
  {
    content: '오늘 경기 멋진 승리했습니다! 팀원들 모두 수고하셨어요. 🏐 #배구 #승리',
    author: { userId: 'user10', name: '김연경', username: 'yeon_koung_kim', color: 'bg-cyan-500' },
  },
];

export const dummyPosts = Array.from({ length: 100 }, (_, index) => {
  const baseIndex = index % baseData.length;
  const basePost = baseData[baseIndex];
  
  const date = new Date(Date.now() - Math.random() * 10000000000);
  
  return {
    id: `${index + 1}`,
    content: `${basePost.content} (게시물 ${index + 1})`,
    author: basePost.author,
    createdAt: date.toISOString(), // ISO 문자열로 저장
    createdAtFormatted: formatDate(date), // 포맷된 문자열 추가
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    reposts: Math.floor(Math.random() * 50),
  };
}).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // 날짜 기준 내림차순 정렬

// 날짜 포맷팅 함수 추가
function formatDate(date: Date): string {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return `${diffSeconds}초 전`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else if (diffDays === 1) {
    return '어제';
  } else if (diffDays < 7) {
    return `${diffDays}일 전`;
  } else {
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}

// 필요한 경우 실시간 업데이트를 위한 함수
export const getFormattedDate = (dateString: string) => {
  return formatDate(new Date(dateString));
};

export type Comment = {
  id: string;
  author: {
    userId: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  postId: string;
};

export const dummyComments: Comment[] = [
  {
    id: '1',
    author: {
      userId: '2',
      name: '김철수',
      username: 'chulsoo_kim',
      avatar: 'https://via.placeholder.com/40'
    },
    content: '멋진 프로젝트네요! 화이팅!',
    createdAt: '30분 전',
    likes: 149,
    postId: '1'
  },
  {
    id: '2',
    author: {
      userId: '3',
      name: '이영희',
      username: 'younghee_lee',
      avatar: 'https://via.placeholder.com/40'
    },
    content: '정말 좋아요! 응원합니다.',
    createdAt: '5분 전',
    likes: 72,
    postId: '1'
  },
  {
    id: '3',
    author: {
      userId: '4',
      name: '박지성',
      username: 'jisung_park',
      avatar: 'https://via.placeholder.com/40'
    },
    content: '멋진 사진이네요!',
    createdAt: '30분 전',
    likes: 95,
    postId: '2'
  },
  {
    id: '4',
    author: {
      userId: '5',
      name: '최민수',
      username: 'minsoo_choi',
      avatar: 'https://via.placeholder.com/40'
    },
    content: '와우, 대단해요!',
    createdAt: '1시간 전',
    likes: 128,
    postId: '3'
  },
  {
    id: '5',
    author: {
      userId: '6',
      name: '손흥민',
      username: 'sonny',
      avatar: 'https://via.placeholder.com/40'
    },
    content: '멋진 게시물이에요!',
    createdAt: '3시간 전',
    likes: 87,
    postId: '4'
  },
  {
    id: '6',
    author: {
      userId: '7',
      name: '김연아',
      username: 'yuna_kim',
      avatar: 'https://via.placeholder.com/40'
    },
    content: '정말 인상적이네요!',
    createdAt: '4시간 전',
    likes: 156,
    postId: '5'
  },
  {
    id: '7',
    author: {
      userId: '8',
      name: '류현진',
      username: 'hyunjin_ryu',
      avatar: 'https://via.placeholder.com/40'
    },
    content: '멋진 내용이에요!',
    createdAt: '5시간 전',
    likes: 64,
    postId: '6'
  },
  {
    id: '8',
    author: {
      userId: '10',
      name: '김연경',
      username: 'yeon_koung_kim',
      avatar: 'https://via.placeholder.com/40'
    },
    content: '좋아요!',
    createdAt: '7시간 전',
    likes: 112,
    postId: '7'
  }
];

export const dummyUsers = [
  dummyCurrentUser,
  ...baseData.slice(1).map(item => item.author),
  ...dummyComments.map(comment => ({
    userId: comment.author.userId,
    name: comment.author.name,
    username: comment.author.username,
    color: 'bg-gray-500',
    avatar: comment.author.avatar,
  }))
].filter((user, index, self) => 
  index === self.findIndex((t) => t.userId === user.userId)
);

export const dummyClubs = [
  { id: '1', name: 'BTS', color: 'bg-purple-500', clubName: 'BTS' },
  { id: '2', name: 'BLACKPINK', color: 'bg-pink-500', clubName: 'BLACKPINK' },
  { id: '3', name: 'EXO', color: 'bg-blue-500', clubName: 'EXO' },
  { id: '4', name: 'TWICE', color: 'bg-yellow-500', clubName: 'TWICE' },
  { id: '5', name: 'NCT', color: 'bg-green-500', clubName: 'NCT' },
];

export type Notification = {
  id: number;
  type: 'follow' | 'like' | 'comment' | 'repost';
  user: string;
  userId: string;
  content: string;
  time: string;
  targetPostId?: string;
};

export const dummyNotifications: Notification[] = [
  { id: 1, type: 'follow', user: '김철수', userId: 'user2', content: '님이 회원님을 팔로우하기 시작���습니다.', time: '방금 전' },
  { id: 2, type: 'like', user: '이영희', userId: 'user3', content: '님이 회원님의 게시물을 좋아합니다.', time: '5분 전', targetPostId: '1' },
  { id: 3, type: 'comment', user: '박지성', userId: 'user4', content: '님이 회원님의 게시물에 댓글을 남겼습니다: "멋진 프로젝트네요!"', time: '30분 전', targetPostId: '1' },
  { id: 4, type: 'repost', user: '최민수', userId: 'user5', content: '님이 회원님의 게시물을 리포스트했습니다.', time: '1시간 전', targetPostId: '1' },
  { id: 5, type: 'follow', user: '손흥민', userId: 'user6', content: '님이 회원님을 팔로우하기 시작했습니다.', time: '2시간 전' },
  { id: 6, type: 'like', user: '김연아', userId: 'user7', content: '님이 회원님의 댓글을 좋아합니다.', time: '3시간 전', targetPostId: '2' },
  { id: 7, type: 'comment', user: '류현진', userId: 'user8', content: '님이 회원님의 게시물에 댓글을 남겼습니다: "정말 인상적이네요!"', time: '4시간 전', targetPostId: '2' },
  { id: 8, type: 'repost', user: '박태환', userId: 'user9', content: '님이 회원님의 게시물을 리포스트했습니다.', time: '5시간 전', targetPostId: '3' },
  { id: 9, type: 'follow', user: '김연경', userId: 'user10', content: '님이 회원님을 팔로우하기 시작했습니다.', time: '6시간 전' },
  { id: 10, type: 'like', user: '김철수', userId: 'user2', content: '님이 회원님의 게시물을 좋아합니다.', time: '7시간 전', targetPostId: '4' },
];

export type ClubNotice = {
  id: string;
  clubId: string;
  title: string;
  content: string;
  author: {
    userId: string;
    name: string;
    username: string;
  };
  createdAt: string;
};

export const dummyClubNotices: ClubNotice[] = [
  {
    id: '1',
    clubId: '1',
    title: 'BTS 새 앨범 발매 안내',
    content: '다음 달 1일 새 앨범이 발매됩니다. 많은 관심 부탁드립니다!',
    author: { userId: 'user1', name: '방탄소년단 매니저', username: 'bts_manager' },
    createdAt: '2023-05-15T10:00:00Z',
  },
  {
    id: '2',
    clubId: '1',
    title: '팬미팅 일정 변경 안내',
    content: '예정되었던 팬미팅 일정이 변경되었습니다. 자세한 내용은 공지를 확인해주세요.',
    author: { userId: 'user1', name: '방탄소년단 매니저', username: 'bts_manager' },
    createdAt: '2023-05-10T14:30:00Z',
  },
  {
    id: '3',
    clubId: '2',
    title: 'BLACKPINK 월드투어 안내',
    content: '다음 달부터 시작되는 월드투어 일정을 안내드립니다.',
    author: { userId: 'user2', name: 'BLACKPINK 매니저', username: 'bp_manager' },
    createdAt: '2023-05-05T09:15:00Z',
  },
  {
    id: '4',
    clubId: '2',
    title: '새 멤버십 상품 출시',
    content: 'BLACKPINK 새 멤버십 상품이 출시되었습니다. 많은 관심 부탁드립니다!',
    author: { userId: 'user2', name: 'BLACKPINK 매니저', username: 'bp_manager' },
    createdAt: '2023-04-30T11:45:00Z',
  },
  // ... 다른 클럽들의 공지사항도 추가할 수 있습니다.
];

export type ClubPost = {
  id: string;
  clubId: string;
  content: string;
  author: {
    userId: string;
    name: string;
    username: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
};

export const dummyClubPosts: ClubPost[] = [
  {
    id: '1',
    clubId: '1',
    content: 'BTS의 새 앨범 정말 기대돼요! 여러분은 어떤 곡이 가장 기대되나요?',
    author: { userId: 'user1', name: 'ARMY팬', username: 'bts_army' },
    createdAt: '2023-05-20T10:00:00Z',
    likes: 150,
    comments: 45,
  },
  {
    id: '2',
    clubId: '1',
    content: '다음 주 팬미팅 참석하시는 분들 계신가요? 함께 가실 분 구해요!',
    author: { userId: 'user2', name: '뷔사랑', username: 'v_love' },
    createdAt: '2023-05-19T15:30:00Z',
    likes: 89,
    comments: 32,
  },
  // ... 더 많은 게시물 추가
];

export type MarketItem = {
  id: string;
  clubId: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export const dummyMarketItems: MarketItem[] = [
  {
    id: '1',
    clubId: '1',
    name: 'BTS 공식 응원봉',
    description: '2023 신규 디자인 BTS 공식 응원봉',
    price: 55000,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    clubId: '1',
    name: 'BTS 포토북',
    description: '멤버들의 미공개 사진이 담긴 한정판 포토북',
    price: 40000,
    image: 'https://via.placeholder.com/150',
  },
  // ... 더 많은 아이템 추가
];