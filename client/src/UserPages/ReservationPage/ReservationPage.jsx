import React, { useState } from "react";

import ReserveSeat from "../ReserveSeat/ReserveSeat";
import ReserveMenu from "../ReserveMenu/ReserveMenu";

import "./ReservationPage.css";

function ReservationPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOrderMenuSelected, setIsOrderMenuSelected] = useState(false);

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
            {isFavorite ? (
              <img
                src="/Assets/FavoriteSelectBtn/FavoriteSelected.png"
                alt=""
              />
            ) : (
              <img
                src="/Assets/FavoriteSelectBtn/FavoriteNotSelected.png"
                alt=""
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
              !isOrderMenuSelected
                ? "section-item section-selected"
                : "section-item  section-not-selected"
            }
          >
            좌석 예약
          </div>
          <div
            className={
              isOrderMenuSelected
                ? "section-item  section-selected"
                : "section-item  section-not-selected"
            }
          >
            메뉴 선택
          </div>
        </div>
        <div
          className={
            !isOrderMenuSelected
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
