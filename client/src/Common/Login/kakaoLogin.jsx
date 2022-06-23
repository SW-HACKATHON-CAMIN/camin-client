import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

import qs from "qs";

import { REST_API_KEY, REDIRECT_URI, TOKEN_API_URL } from "./KakaoAuth";

function KakaoLogin({ setIsLogin }) {
  const navigate = useNavigate();
  let authCode = new URL(window.location.href).searchParams.get("code");

  const getAccessToken = useMutation(
    (authCode) => {
      axios.post("http://118.67.133.82:8080/api/auth/kakao/token", authCode);
    },
    {
      onSuccess: () => {
        setIsLogin(true);
        alert("로그인 완료!");
        navigate("/map");
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );

  useEffect(() => {
    const authCode = new URL(window.location.href).searchParams.get("code");
    if (authCode) {
      getAccessToken
        .mutateAsync(authCode)
        .then(() => {})
        .catch((e) => {
          console.log(e);
        });
    }
  }, [authCode]);

  return null;
}

export default KakaoLogin;
