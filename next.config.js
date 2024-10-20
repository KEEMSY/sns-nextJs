/** @type {import('next').NextConfig} */

const nextConfig = {
  // React의 Strict Mode를 활성화합니다.
  // 이는 개발 중 잠재적인 문제를 조기에 발견하는 데 도움을 줍니다.
  // 예를 들어, 안전하지 않은 생명주기 메서드 사용, 레거시 API 사용 등을 감지합니다.
  reactStrictMode: true,

  // 이미지 최적화 관련 설정입니다.
  images: {
    // 외부 이미지 소스의 도메인을 지정합니다.
    // 여기에 나열된 도메인의 이미지만 Next.js의 이미지 최적화 기능을 사용할 수 있습니다.
    // 이는 보안을 강화하고, 최적화된 이미지 제공을 가능하게 합니다.
    domains: ['ui-avatars.com', 'via.placeholder.com'],
  },

  // 여기에 추가적인 Next.js 설정을 포함할 수 있습니다.
  // 예: 국제화(i18n), 리다이렉션, 웹팩 설정 커스터마이징 등
}

// 이 설정을 Next.js에 제공합니다.
module.exports = nextConfig

// 주요 Next.js 설정 옵션 (현재 사용하지 않는 것들):
// - webpack: (config, options) => { ... } - 웹팩 설정을 커스터마이즈합니다.
// - env: { ... } - 환경 변수를 설정합니다.
// - pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'] - 페이지로 간주할 파일 확장자를 지정합니다.
// - redirects: async () => [ ... ] - 리다이렉션 규칙을 설정합니다.
// - rewrites: async () => [ ... ] - URL 재작성 규칙을 설정합니다.
// - headers: async () => [ ... ] - 커스텀 HTTP 헤더를 설정합니다.
