const baseData = [
  {
    content: '오늘 새로운 프로젝트를 시작했어요. 너무 신나요! 🚀 #코딩 #새로운시작',
    author: { name: '김개발', username: 'dev_kim' },
  },
  {
    content: '맛있는 점심 먹고 왔습니다. 오늘 점심 메뉴는 비빔밥! 🍲 #맛집 #점심스타그램',
    author: { name: '박맛집', username: 'foodie_park' },
  },
  {
    content: '새 앨범 작업 중입니다. 기대해주세요! 🎵 #음악 #신보',
    author: { name: '이가수', username: 'singer_lee' },
  },
  {
    content: '오늘 날씨가 정말 좋네요. 산책하기 딱 좋은 날이에요. ☀️ #날씨 #산책',
    author: { name: '정날씨', username: 'weather_jung' },
  },
  {
    content: '새로운 책을 읽기 시작했어요. 추천받은 책인데 정말 재미있네요! 📚 #독서 #책추천',
    author: { name: '최독서', username: 'book_choi' },
  },
  {
    content: '오늘 운동 완료! 건강한 하루 되세요 💪 #운동 #헬스',
    author: { name: '강운동', username: 'fitness_kang' },
  },
  {
    content: '새로운 여행지 추천합니다. 여기 경치가 정말 예뻐요! 🏞️ #여행 #풍경',
    author: { name: '윤여행', username: 'traveler_yoon' },
  },
  {
    content: '오늘의 요리: 파스타 만들기 성공! 🍝 #요리 #홈쿡',
    author: { name: '한요리', username: 'chef_han' },
  },
  {
    content: '새 영화 촬영 시작했습니다. 기대해주세요! 🎬 #영화 #배우',
    author: { name: '배배우', username: 'actor_bae' },
  },
  {
    content: '오늘 전시회 다녀왔어요. 정말 인상적이었습니다. 🎨 #미술 #전시',
    author: { name: '고미술', username: 'art_go' },
  },
];

export const dummyPosts = Array.from({ length: 100 }, (_, index) => {
  const baseIndex = index % baseData.length;
  const basePost = baseData[baseIndex];
  
  return {
    id: index + 1,
    content: `${basePost.content} (게시물 ${index + 1})`,
    author: basePost.author,
    timestamp: `${Math.floor(Math.random() * 24)}시간 전`,
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    reposts: Math.floor(Math.random() * 50),
  };
});