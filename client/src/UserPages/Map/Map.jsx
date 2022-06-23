import React, { useState, useEffect } from "react";

import "./Map.css";
import "./MapSearchBar.css";
import CafeInfoPopup from "../CafeInfoPopup/CafeInfoPopup";

const { kakao } = window;

function Map() {
  const [latitude, setLatitude] = useState(33.450701);
  const [longitude, setLongitude] = useState(126.570667);

  //고객이 입력한 검색어
  const [inputLocation, setInputLocation] = useState("");
  const [isFirst, setIsFirst] = useState(false);

  //카페 간략정보 불러오기
  const [modalShow, setModalShow] = useState(false);

  let watcherID = navigator.geolocation.watchPosition(function (position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setIsFirst(true);
  });

  navigator.geolocation.clearWatch(watcherID); // 위치 갱신 그만 두기

  useEffect(() => {
    const script = document.createElement("script");

    let mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation && !isFirst) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">내 위치</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);

        setIsFirst(true);
      });
    } else if (navigator.geolocation && isFirst) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = latitude, // 위도
          lon = longitude; // 경도

        let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";
      displayMarker(locPosition, message);
    }

    const markerdata = [
      {
        title: "콜드스퀘어",
        lat: 33.450701,
        lng: 126.570567,
        type: ["조용한", "카페공부가능"],
        status: 1,
      },
      {
        title: "하남돼지집",
        lat: 33.450711,
        lng: 126.570667,
        type: ["활기찬", "카페공부가능"],
        status: 1,
      },
      {
        title: "수유리우동",
        lat: 33.450601,
        lng: 126.570657,
        type: ["신비한", "카페공부가능"],
        status: 2,
      },
      {
        title: "맛닭꼬",
        lat: 33.450701,
        lng: 126.57067,
        type: ["활기찬", "카페공부불가능"],
        status: 1,
      },
    ];

    //마커 처리
    markerdata.forEach((el) => {
      // 마커를 생성합니다
      let thisLocPosition = new kakao.maps.LatLng(el.lat, el.lng);

      var contents = el;

      var thisMarker = new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: thisLocPosition,
        //마커에 hover시 나타날 title
        title: el.title,

        clickable: true,
      });

      // 마커와 인포윈도우를 표시합니다
      displayMarker(thisLocPosition, contents);
    });

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, contents) {
      var imageSrc;

      //혼잡도에 따른 마커 색 지정
      if (contents.status === 0) {
        imageSrc = "/Asset/"; // 마커이미지의 주소입니다
      } else if (contents.status === 1) {
        imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"; // 마커이미지의 주소입니다
      } else if (contents.status === 2) {
        imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"; // 마커이미지의 주소입니다
      } else {
        imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"; // 마커이미지의 주소입니다
      }
      //좌석 혼잡도별 마커 이미지 생성

      var imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        clickable: true,
        image: markerImage, // 마커이미지 설정
      });

      let iwContent = contents.title, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      let infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(map, marker);
        alert(contents.type);
        // cafeBrief(contents.title,"",contents.type,"","")
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
  }, [latitude, longitude]);

  function onChangeLocation(e) {
    const script = document.createElement("script");

    setInputLocation(e.target.value);

    // 장소 검색 객체를 생성합니다
    let ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(e.target.value, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          // displayMarker(data[i]);
          setLatitude(data[i].y);
          setLongitude(data[i].x);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // map.setBounds(bounds);
      }
    }
  }

  return (
    <>
      <CafeInfoPopup />
      <div className="map-searchbar-container">
        {inputLocation ? (
          <div className="map-title">
            "{inputLocation}" <span className="text-cafe">카페</span>
          </div>
        ) : (
          <div className="map-title">카페찾기</div>
        )}
        <div className="text-box-wrapper">
          <input
            type="text"
            placeholder="어디 동네 핫한 카페 찾아요?"
            className="text-box"
            onChange={onChangeLocation}
          ></input>
        </div>
      </div>
      <div id="map"></div>
    </>
  );
}

export default Map;
