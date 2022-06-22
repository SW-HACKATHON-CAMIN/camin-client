import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
/* CSS Import */
import "./MainLayout.css";
import "./login.css";
import "./loginAPI.js"


function Login(props) {
  const[loginRequest, setLoginRequest] = useState(false);

  const REST_API_KEY = "ca8c40745e8e48038322e1f00094dee0";
  const kakaoLoginUrl = "https://kauth.kakao.com/oauth/authorize";
  const kakaoLogOutUrl = "https://kauth.kakao.com/oauth/logout";
  const kakaoTokenApiUrl = "https://kauth.kakao.com/oauth/token"; 
  const redirectUrl = "";

  // 3-2. 카카오 로그인 창으로 이동
  function moveKakaoLogin() {
    window.location.href = `${kakaoLoginUrl}?client_id=${REST_API_KEY}&redirect_uri=${redirectUrl}&response_type=code`;
  }

  function getKakaoToken(code) {
		let token = "";
        let data = {
            "grant_type": "authorization_code",
            "client_id": REST_API_KEY,
            "redirect_uri": redirectUrl,
            "code": code,
        };

        axios.post(kakaoTokenApiUrl, {
            data: data,
            dataType: "json",
            async: false,
        }).then(

            
        )

        
            return token;
        }

  const { View, Menu } = props;



  useEffect( ()=> {
    if(loginRequest === true){
      moveKakaoLogin();
    }
  },[loginRequest])



  return (
    <div className="backBody">
      <div className="loginTitle">로그인이 <br/>필요한 서비스에요</div>

      <div className="loginText">간편하게 로그인하고<br/>내 주변의 다양한 카페를 만나봐요.</div>

      <div className="loginBlock" onClick={()=>setLoginRequest(true)}>
      <img src="/Assets/kakaoLogin/kakaoLogin.png" alt="카카오로그인"></img>
      </div>




      <div className="main-layout-container">
      <View {...props} />
      <div className="bottom-bar">
        {Menu === "Map" ? (
          <Link to="/map" className="selected">
            <div className="bottom-bar-icon">
              <img src="/Assets/BottomBarIcons/Map.png" alt="지도" />
              <div>지도</div>
            </div>
          </Link>
        ) : (
          <Link to="/map" className="not-selected">
            <div className="bottom-bar-icon">
              <img src="/Assets/BottomBarIcons/Map.png" alt="지도" />
              <div>지도</div>
            </div>
          </Link>
        )}
        {Menu === "FavoriteCafe" ? (
          <Link to="/favoritecafe" className="selected">
            <div className="bottom-bar-icon">
              <img src="/Assets/BottomBarIcons/Favorite.png" alt="찜한 카페" />
              <div>찜한 카페</div>
            </div>
          </Link>
        ) : (
          <Link to="/favoritecafe" className="not-selected">
            <div className="bottom-bar-icon">
              <img src="/Assets/BottomBarIcons/Favorite.png" alt="찜한 카페" />
              <div>찜한 카페</div>
            </div>
          </Link>
        )}
        {Menu === "ReservationInfo" ? (
          <Link to="/reservationinfo" className="selected">
            <div className="bottom-bar-icon">
              <img
                src="/Assets/BottomBarIcons/ReservationInfo.png"
                alt="예약내역"
              />
              <div>예약내역</div>
            </div>
          </Link>
        ) : (
          <Link to="/reservationinfo" className="not-selected">
            <div className="bottom-bar-icon">
              <img
                src="/Assets/BottomBarIcons/ReservationInfo.png"
                alt="예약내역"
              />
              <div>예약내역</div>
            </div>
          </Link>
        )}
        {Menu === "MyInfo" ? (
          <Link to="/myinfo" className="selected">
            <div className="bottom-bar-icon">
              <img src="/Assets/BottomBarIcons/MyInfo.png" alt="내 정보" />
              <div>my카민</div>
            </div>
          </Link>
        ) : (
          <Link to="/myinfo" className="not-selected">
            <div className="bottom-bar-icon">
              <img src="/Assets/BottomBarIcons/MyInfo.png" alt="내 정보" />
              <div>my카민</div>
            </div>
          </Link>
        )}
      </div>
    </div>
  </div>
  )
}

export default Login