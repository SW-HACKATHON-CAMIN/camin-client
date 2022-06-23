import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Map.css";
import "./MapSearchBar.css";
// import CafeInfoPopup from "../CafeInfoPopup/CafeInfoPopup";
// import Filter from "./Filter";

import { useNavigate } from "react-router-dom";
import "../CafeInfoPopup/CafeInfoPopup.css";
import "./filter.css";

const { kakao } = window;

function Map() {
  const [latitude, setLatitude] = useState(33.450701);
  const [longitude, setLongitude] = useState(126.570667);

  //고객이 입력한 검색어
  const [inputLocation, setInputLocation] = useState("");
  const [isFirst, setIsFirst] = useState(false);

  //카페 간략정보 불러오기
  const [cafeInfoPopup, setCafeInfoPopup] = useState(false);

  //필터 정보 불러오기
  const [openFilter, setOpenFilter] = useState(false);

  //필터용 상태관리

  const [visiterNum, setVisiterNum] = useState(false);
  const [purpose, setPurpose] = useState(false);
  const [category, setCategory] = useState(false);
  const [experience, setExperience] = useState(false);

  //실시간 지도 정보
  const [mapInfo, setMapInfo] = useState(false);

  const [categoryId, setCategoryId] = useState(false);

  //선택된 좌표
  const [selectedMarker, setSelectedMarker] = useState(false);

  //실제 지도 관련 코드

  let watcherID = navigator.geolocation.watchPosition(function (position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setIsFirst(true);
  });

  navigator.geolocation.clearWatch(watcherID); // 위치 갱신 그만 두기

  useEffect(() => {
    const script = document.createElement("script");

    //지도정보 임시 저장용
    var thisMapInfo;

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
        let lat = 37.5578747542407, // 위도
          lon = 126.927104943545; // 경도

        let locPosition = new kakao.maps.LatLng(
            37.5578747542407,
            126.927104943545
          ), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
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

        console.log("lat:", latitude);
        console.log("lon:", longitude);

        let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        //지도 정보 받아오기
        getCafeList(lat, lon, categoryId);

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      let locPosition = new kakao.maps.LatLng(
          37.5578747542407,
          126.927104943545
        ),
        message = "geolocation을 사용할수 없어요..";

      //지도 정보 받아오기
      getCafeList(37.5578747542407, 126.927104943545, categoryId);

      displayMarker(locPosition, message);
    }

    if (!mapInfo === false) {
      //마커 처리
      mapInfo.forEach((el) => {
        // 마커를 생성합니다
        let thisLocPosition = new kakao.maps.LatLng(el.latitude, el.longitude);

        var contents = el;

        // 마커와 인포윈도우를 표시합니다
        displayMarker(thisLocPosition, contents);
      });
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, contents) {
      var imageSrc;

      //혼잡도에 따른 마커 색 지정
      if (contents.status === 0) {
        imageSrc =
          "https://user-images.githubusercontent.com/80206884/175188652-6db4e5cc-97eb-4564-a508-e38cb80d771c.png"; // 마커이미지의 주소입니다
      } else if (contents.status === 1) {
        imageSrc =
          "https://user-images.githubusercontent.com/80206884/175188647-52f3890b-9e1e-4308-940d-533a61301561.png"; // 마커이미지의 주소입니다
      } else if (contents.status === 2) {
        imageSrc =
          "https://user-images.githubusercontent.com/80206884/175188658-9b48de60-cdc2-4f89-8f36-c1c9d944147a.png"; // 마커이미지의 주소입니다
      } else if (contents.status === 3) {
        imageSrc =
          "https://user-images.githubusercontent.com/80206884/175188642-b003f895-e8c7-4ccc-a0f6-82dc8f1aa7a9.png"; // 마커이미지의 주소입니다
      } else {
        imageSrc =
          "https://user-images.githubusercontent.com/80206884/175188652-6db4e5cc-97eb-4564-a508-e38cb80d771c.png";
      }
      //좌석 혼잡도별 마커 이미지 생성

      var imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(15, 15) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

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
        // title: contents.id,
      });

      // let iwContent = contents.title, // 인포윈도우에 표시할 내용
      //   iwRemoveable = true;

      // // 인포윈도우를 생성합니다
      // let infowindow = new kakao.maps.InfoWindow({
      //   content: iwContent,
      //   removable: iwRemoveable,
      // });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // setSelectedMarker(contents.id);
        showCafeInfoPopup();
        // cafeBrief(contents.title,"",contents.type,"","")
      });

      // 인포윈도우를 마커위에 표시합니다
      // infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
  }, [latitude, longitude]);

  //필터 값에 따른 카테고리 정보 받아오기(카테고리 API)
  useEffect(() => {
    let visiterNumArr = [];
    let purposeArr = [];
    let categoryArr = [];
    let experienceArr = [];

    axios.get("/api/category").then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].type === 0) {
          visiterNumArr.push(response.data[i]);
          console.log(response.data[i]);
        }
        if (response.data[i].type === 1) {
          purposeArr.push(response.data[i]);
          console.log(response.data[i]);
        }
        if (response.data[i].type === 2) {
          categoryArr.push(response.data[i]);
          console.log(response.data[i]);
        }
        if (response.data[i].type === 3) {
          experienceArr.push(response.data[i]);
          console.log(response.data[i]);
        }
        setVisiterNum(visiterNumArr);
        setPurpose(purposeArr);
        setCategory(categoryArr);
        setExperience(experienceArr);
      }
    });
  }, [openFilter]);

  // useEffect(() => {
  //   showCafeInfoPopup();
  // }, [selectedMarker]);


  const dumpData = [
    {
      address: '서울 마포구 홍익로6길 15 삼주빌딩',
      cafeName: '공미학 마포홍대점',
      category : [
        {
          'id':0
        }
      ],
      id: 0,
      mainImage: "https://user-images.githubusercontent.com/80206884/175315506-ee3c9ce2-3bf3-499a-b120-17dc7d8a7748.png",
      status: 2,

    }
  ]



  const getCafeList = (latitude, longitude, categoryIds) => {
    var result = "";
    console.log(latitude, longitude, categoryIds);

    if (!categoryIds) {
      axios
        .get(
          `/api/cafe/?latitude=${latitude}&longitude=${longitude}&categoryIds=`
        )
        .then((response) => {
          setMapInfo(response.data);
          result = response.data;
          console.log("response.data", result);
          return result;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(
          `/api/cafe/?latitude=${latitude}&longitude=${longitude}&categoryIds=${JSON.stringify(
            categoryIds
          )}`
        )
        .then((response) => {
          setMapInfo(response.data);
          result = response.data;
          console.log("response.data", result);
          return result;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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

  //마킹 클릭 시 간단한 소개 창 띄우기
  const showCafeInfoPopup = () => {
    if (!cafeInfoPopup) {
      setCafeInfoPopup(true);
    } else {
      setCafeInfoPopup(false);
    }
  };

  /**팝업 창*/
  function CafeInfoPopup() {
    //, cafeName, address, type, status, img API개발되면 추가하기
    const navigate = useNavigate();

    const cafeInfoClose = () => {
      setCafeInfoPopup(false);
    };

    const gotoReservationPage = () => {
      navigate("/reservation");
    };

    // const PrintCategories = () =>{
    //   for(var i = 0; i < mapInfo.length; i++){
    //     if(mapInfo[i].id == selectedMarker){
    //       for(var j = 0; j < mapInfo.categories.length; i++){
    //         <div className="category-item">{mapInfo.categories[j].name}</div>
    //       }
    //     }
    //   }
    // }
    console.log(selectedMarker);
    console.log(mapInfo);

    return (
      <>
        <div
          className={cafeInfoPopup ? "show-background" : "hide-background"}
          onClick={cafeInfoClose}
        ></div>
        <div className={cafeInfoPopup ? "show-cafe-info" : "hide-cafe-info"}>
         
                  <div className="cafe-info-items">
                    <div className="cafe-name-img-wrap">
                      <div className="status-icon">혼잡</div>
                      <div className="name-address-wrap">
                        <div className="cafe-name">공미학 마포홍대점</div>
                        <div className="cafe-address">서울 마포구 홍익로6길 15 삼주빌딩</div>
                        <div className="cafe-categories">
                          <div className="category-item">혼자가기 적합</div>
                          <div className="category-item">수다</div>
                          <div className="category-item">베이커리</div>
                          <div className="category-item">애견동반</div>
                        </div>
                      </div>
                      <div className="cafe-img">
                        <img src="https://user-images.githubusercontent.com/80206884/175315506-ee3c9ce2-3bf3-499a-b120-17dc7d8a7748.png" alt=""  style={{width:"100px"}}/>
                      </div>
                    </div>
                  </div>;

          <div className="reserve-seat-btn" onClick={gotoReservationPage}>
            좌석 예약하기
          </div>
        </div>
      </>
    );
  }

  //필터링 클릭 시 간단한 소개 창 띄우기
  const showFilter = () => {
    if (!openFilter) {
      setOpenFilter(true);
    } else {
      setOpenFilter(false);
    }
  };

  /**필터창**/
  function Filter() {
    const cafeInfoClose = () => {
      setOpenFilter(false);
    };

    return (
      <div
        className={openFilter ? "show-background" : "hide-background"}
        onClick={cafeInfoClose}
      >
        <div className={openFilter ? "show-filter" : "hide-filter"}>
          <div className="cafe-filter-items">
            {!visiterNum ? (
              <></>
            ) : (
              <div className="cafe-filter-each-items">
                <span>방문 인원</span>
                <br />
                <div className="cafe-categories">
                  {visiterNum.map((thisData) => (
                    <div
                      id={thisData.id}
                      key={thisData.id}
                      className="category-item"
                    >
                      {thisData.name}
                    </div>
                  ))}
                </div>
                <hr />
              </div>
            )}

            {!purpose ? (
              <></>
            ) : (
              <div className="cafe-filter-each-items">
                방문 목적
                <div className="cafe-categories">
                  {purpose.map((thisData) => (
                    <div
                      id={thisData.id}
                      key={thisData.id}
                      className="category-item"
                    >
                      {thisData.name}
                    </div>
                  ))}
                </div>
                <hr />
              </div>
            )}

            {!category ? (
              <></>
            ) : (
              <div className="cafe-filter-each-items">
                카테고리
                <div className="cafe-categories">
                  {category.map((thisData) => (
                    <div
                      id={thisData.id}
                      key={thisData.id}
                      className="category-item"
                    >
                      {thisData.name}
                    </div>
                  ))}
                </div>
                <hr />
              </div>
            )}

            {!experience ? (
              <></>
            ) : (
              <div className="cafe-filter-each-items">
                분위기
                <div className="cafe-categories">
                  {experience.map((thisData) => (
                    <div
                      id={thisData.id}
                      key={thisData.id}
                      className="category-item"
                    >
                      {thisData.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="cafe-filter-each-items">
              <div className="cafe-categories">
                <div className="filter-reset-btn">필터 초기화</div>
                <div className="filter-apply-btn">적용하기</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <CafeInfoPopup open={cafeInfoPopup} />
      {/* <Filter /> */}
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

      {/* <div id="filter-btn" onClick={showFilter}>
        <img src="/Assets/map/filter.png" alt="필터링" />
      </div> */}
      <div id="map"></div>
    </>
  );
}

export default Map;
