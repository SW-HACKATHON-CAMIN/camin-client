import React from 'react'
import axios from "axios";

export default function kakaoLogin() {

    const REST_API_KEY = "ca8c40745e8e48038322e1f00094dee0";
    const kakaoLoginUrl = "https://kauth.kakao.com/oauth/authorize";
    const kakaoLogOutUrl = "https://kauth.kakao.com/oauth/logout";
    const kakaoTokenApiUrl = "https://kauth.kakao.com/oauth/token"; 
    const redirectUrl = "";

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
  
  
    return (
    <div>
      
    </div>
  )
}
