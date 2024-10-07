export const dummyCurrentUser = {
  id: '1',
  name: 'KEEMSY',
  username: 'keemsy',
  bio: '🇰🇷 웹 개발자 | 커피 애호가',
  followers: 7777,
  following: 777,
  location: '서울, 대한민국',
  website: 'keemsy.com',
  joinDate: '2020년 3월 가입',
  color: 'bg-blue-500',
};

const baseData = [
  {
    content: '오늘 새로운 프로젝트를 시작했어요. 너무 신나요! 🚀 #코딩 #새로운시작',
    author: dummyCurrentUser,
  },
  {
    content: '맛있는 점심 먹고 왔습니다. 오늘 점심 메뉴는 비빔밥! 🍲 #맛집 #점심스타그램',
    author: { id: '2', name: '박맛집', username: 'foodie_park', color: 'bg-green-500' },
  },
  {
    content: '새 앨범 작업 중입니다. 기대해주세요! 🎵 #음악 #신보',
    author: { id: '3', name: '이가수', username: 'singer_lee', color: 'bg-purple-500' },
  },
  {
    content: '오늘 날씨가 정말 좋네요. 산책하기 딱 좋은 날이에요. ☀️ #날씨 #산책',
    author: { id: '4', name: '정날씨', username: 'weather_jung', color: 'bg-yellow-500' },
  },
  {
    content: '새로운 책을 읽기 시작했어요. 추천받은 책인데 정말 재미있네요! 📚 #독서 #책추천',
    author: { id: '5', name: '최독서', username: 'book_choi', color: 'bg-red-500' },
  },
  // ... 나머지 baseData 항목들도 같은 방식으로 수정
];

export const dummyPosts = Array.from({ length: 100 }, (_, index) => {
  const baseIndex = index % baseData.length;
  const basePost = baseData[baseIndex];
  
  return {
    id: `post-${index + 1}`,
    content: `${basePost.content} (게시물 ${index + 1})`,
    author: basePost.author,
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    reposts: Math.floor(Math.random() * 50),
  };
});

export const dummyUsers = [dummyCurrentUser, ...baseData.slice(1).map(item => item.author)];

export const dummyClubs = [
  { id: '1', name: 'BTS', color: 'bg-purple-500', clubName: 'BTS' },
  { id: '2', name: 'BLACKPINK', color: 'bg-pink-500', clubName: 'BLACKPINK' },
  { id: '3', name: 'EXO', color: 'bg-blue-500', clubName: 'EXO' },
  { id: '4', name: 'TWICE', color: 'bg-yellow-500', clubName: 'TWICE' },
  { id: '5', name: 'NCT', color: 'bg-green-500', clubName: 'NCT' },
];

