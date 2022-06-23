import React, { useState, useEffect } from "react";

import "./MyInfo.css";

import { REST_API_KEY, LOGOUT_REDIRECT_URI } from "../Login/KakaoAuth";

function MyInfo() {
  const [userName, setUserName] = useState("");

  const kakaoLogOutUrl = "https://kauth.kakao.com/oauth/logout";

  function logoutWithKakao() {
    window.location.href = `${kakaoLogOutUrl}?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("name");
  }

  useEffect(() => {
    setUserName(sessionStorage.getItem("name"));
  }, [userName]);

  return (
    <div className="myinfo-container">
      <div className="my-profile-box">
        <div className="profile-img-box">
          <img className="profile-img" src="/Assets/myprofileimg.png" alt="" />
        </div>
        <div className="user-name">{userName}</div>
      </div>
      <div className="logout-btn" onClick={logoutWithKakao}>
        로그아웃
      </div>
    </div>
  );
}

export default MyInfo;
