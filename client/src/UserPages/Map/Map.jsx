import React, { useState, useEffect } from "react";

import "./Map.css";
import "./header.css";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const { kakao } = window;

function Map() {
  const [latitude, setLatitude] = useState(33.450701);
  const [longitude, setLongitude] = useState(126.570667);

  //고객이 입력한 검색어
  const [inputLocation, setInputLocation] = useState(false);



  var watcherID = navigator.geolocation.watchPosition(function (position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  // navigator.geolocation.clearWatch(watcherID); // 위치 갱신 그만 두기

  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";

      displayMarker(locPosition, message);
    }


    const markerdata = [
      {
        title: "콜드스퀘어",
        lat: 33.450701,
        lng: 126.570667,
      },
      {
        title: "하남돼지집",
        lat: 37.620842424005616,
        lng: 127.1583774403176,
      },
      {
        title: "수유리우동",
        lat: 37.624915253753194,
        lng: 127.15122688059974,
      },
      {
        title: "맛닭꼬",
        lat: 37.62456273069659,
        lng: 127.15211256646381,
      },
    ];
    
    //마커 처리
    markerdata.forEach((el) => {
      // 마커를 생성합니다
      new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lng),
        //마커에 hover시 나타날 title
        title: el.title,
      });
    });


    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });



      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
  }, [latitude, longitude]);


  //검색어 입력
  const onChangeinputLocation = (e) => {
    setInputLocation(e.target.value);


    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(); 

    // 키워드로 장소를 검색합니다
    ps.keywordSearch('이태원 맛집', placesSearchCB); 

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          var bounds = new kakao.maps.LatLngBounds();

          for (var i=0; i<data.length; i++) {
              displayMarker(data[i]);    
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }       

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
      } 
    }

        // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
        
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x) 
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function() {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
          infowindow.open(map, marker);
      });
    }
  }


  return (
  <>
  <div className="header">
    <div className="title">
    {
      inputLocation?
      <span id="title">"{inputLocation}"카페</span>:
      <span id="title">카페찾기</span>
    }
    </div>
    <br/>
    <Form  className="item">
    <Form.Control></Form.Control>
    </Form>
    <i class="icon ion-ios-search"></i>
    </div>


    <div id="map">
    </div>

  </>
  )
}

export default Map;
