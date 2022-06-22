import React from "react";

/* CSS Import */
import "./Login.css";

import { KAKAO_AUTH_URL } from "./KakaoAuth";

function Login() {
  return (
    <div className="backBody">
      <div className="loginTitle">
        로그인이 <br />
        필요한 서비스에요
      </div>
      <div className="loginText">
        간편하게 로그인하고
        <br />내 주변의 다양한 카페를 만나봐요.
      </div>
      <a href={KAKAO_AUTH_URL} className="loginBlock">
        <img src="/Assets/kakaoLogin/kakaoLogin.png" alt="카카오로그인" />
      </a>
    </div>
  );
}

export default Login;
