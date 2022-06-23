import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KakaoLogin({ setIsLogin }) {
  const navigate = useNavigate();
  let authCode = new URL(window.location.href).searchParams.get("code");

  const getAccessToken = () => {
    axios
      .post("http://118.67.133.82:8080/api/auth/kakao/token", {
        code: authCode,
      })
      .then(function (response) {
        if (response) {
          console.log(response.data);
          sessionStorage.setItem("userId", response.data.id);
          setIsLogin(true);
          navigate("/map");
        }
      });
  };

  useEffect(() => {
    const authCode = new URL(window.location.href).searchParams.get("code");
    if (authCode) {
      getAccessToken();
    }
  }, [authCode]);

  return null;
}

export default KakaoLogin;
