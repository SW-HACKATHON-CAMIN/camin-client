import React, { useState } from "react";
import axios from "axios";

import ReserveSeat from "../ReserveSeat/ReserveSeat";
import ReserveMenu from "../ReserveMenu/ReserveMenu";

import "./ReservationPage.css";

function ReservationPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOrderMenuSelected, setIsOrderMenuSelected] = useState(false);
  const [isReserveSeatSelected, setIsReserveSeatSelected] = useState(true);

  const handleOrderMenuSelect = () => {
    setIsOrderMenuSelected(true);
    setIsReserveSeatSelected(false);
    //setIsOrderMenuSelected((isOrderMenuSelected) => !isOrderMenuSelected);
  };

  const handleReserveSeatSelect = () => {
    setIsReserveSeatSelected(true);
    setIsOrderMenuSelected(false);
    //setIsReserveSeatSelected((isReserveSeatSelected) => !isReserveSeatSelected);
  };

  const handleSelectFavorite = () => {
    setIsFavorite(true);
    console.log("찜 완료");
    // 찜하기 API 넣기
    // axios
    //   .post("/api/user/like", {
    //     cafeId: 1,
    //     userId: sessionStorage.getItem("userId"),
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   });
  };
  const handleCancelFavorite = () => {
    setIsFavorite(false);
    console.log("찜 해제");
    // 찜해제 API 넣기
        // axios
    //   .delete("/api/user/like", {
    //     cafeId: 1,
    //     userId: sessionStorage.getItem("userId"),
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   });
  };

  return (
    <div className="reservationpage-wrapper">
      <div className="reservationpage-cafe-main-img">
        <img src="/Assets/test2.png" alt="" />
      </div>
      <div className="reservationpage-cafe-info">
        <div className="reservationpage-name-address-favoritebtn-wrap">
          <div className="reservationpage-name-address-wrap">
            <div className="reservationpage-cafe-name">오츠에스프레소</div>
            <div className="reservationpage-cafe-address">
              서울특별시 마포구 독막로 14길 32
            </div>
          </div>
          <div className="reservationpage-favorite-select-btn">
            {isFavorite === true ? (
              <img
                src="/Assets/FavoriteSelectBtn/FavoriteSelected.png"
                alt=""
                onClick={handleCancelFavorite}
              />
            ) : (
              <img
                src="/Assets/FavoriteSelectBtn/FavoriteNotSelected.png"
                alt=""
                onClick={handleSelectFavorite}
              />
            )}
          </div>
        </div>
        <div className="reservationpage-cafe-categories">
          <div className="reservationpage-category-item">혼자가기 적합</div>
          <div className="reservationpage-category-item">수다</div>
          <div className="reservationpage-category-item">베이커리</div>
          <div className="reservationpage-category-item">애견동반</div>
        </div>
      </div>
      <div className="reserve-section">
        <div className="section-bar">
          <div
            className={
              isReserveSeatSelected
                ? "section-item section-selected"
                : "section-item  section-not-selected"
            }
            onClick={handleReserveSeatSelect}
          >
            좌석 예약
          </div>
          <div
            className={
              isOrderMenuSelected
                ? "section-item  section-selected"
                : "section-item  section-not-selected"
            }
            onClick={handleOrderMenuSelect}
          >
            메뉴 선택
          </div>
        </div>
        <div
          className={
            isReserveSeatSelected
              ? "line line-selected"
              : "line line-not-selected"
          }
        ></div>
        <div
          className={
            isOrderMenuSelected
              ? "line line-selected"
              : "line line-not-selected"
          }
        ></div>
        {isOrderMenuSelected ? <ReserveMenu /> : <ReserveSeat />}
      </div>
    </div>
  );
}

export default ReservationPage;
