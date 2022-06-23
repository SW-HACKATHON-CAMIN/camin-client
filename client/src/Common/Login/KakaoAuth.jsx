export const REST_API_KEY = "ca8c40745e8e48038322e1f00094dee0";
export const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
export const LOGOUT_REDIRECT_URI = "http://localhost:3000/login"
export const TOKEN_API_URL = "https://kauth.kakao.com/oauth/token"
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
