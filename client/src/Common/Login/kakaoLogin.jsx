import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

import qs from "qs";

import { REST_API_KEY, REDIRECT_URI, TOKEN_API_URL } from "./KakaoAuth";

function KakaoLogin({setIsLogin}) {
  const navigate = useNavigate();
  let authCode = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (authCode) {
      let data = {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: authCode,
      };
      getKakaoToken
        .mutateAsync(qs.stringify(data))
        .then((res) => {
          //setKakaoToken(res.access_token);
          console.log(res);
          setIsLogin(true)
        })
        .then(navigate("/map"))
        .catch((e) => {
          console.log(e);
        });
    }
  }, [authCode]);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const getKakaoToken = useMutation((data) => {
    axios.post(TOKEN_API_URL, data, { headers });
  });

  // useEffect(() => {
  //   if (authCode) {
  //     getKakaoToken(authCode);
  //   }
  // }, [authCode]);

  // function getKakaoToken(authCode) {
  //   let token = "";
  //   let data = {
  //     grant_type: "authorization_code",
  //     client_id: REST_API_KEY,
  //     redirect_uri: REDIRECT_URI,
  //     code: authCode,
  //   };

  //   axios
  //     .post(TOKEN_API_URL, {
  //       data: data,
  //       dataType: "json",
  //       async: false,
  //     }, )
  //     .then((res) => console.log(res))
  //     .then(navigate("/map"));
  //   return token;
  // }

  return <div></div>;
}

export default KakaoLogin;
