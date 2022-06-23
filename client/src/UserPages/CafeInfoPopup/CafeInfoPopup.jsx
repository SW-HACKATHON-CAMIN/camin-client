import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CafeInfoPopup.css";

function CafeInfoPopup({ cafeName, address, type, status, img }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const cafeInfoClose = () => {
    setIsOpen(false);
  };

  const gotoReservationPage = () => {
    navigate("/reservation");
  };

  return (
    <>
      <div className={isOpen ? "show-background" : "hide-background"} onClick={cafeInfoClose}></div>
      <div className={isOpen ? "show-cafe-info" : "hide-cafe-info"}>
        <div className="cafe-info-items">
          <div className="cafe-name-img-wrap">
            <div className="name-address-wrap">
              <div className="cafe-name">오츠에스프레소</div>
              <div className="cafe-address">
                서울특별시 마포구 독막로 14길 32
              </div>
              <div className="cafe-categories">
                <div className="category-item">혼자가기 적합</div>
                <div className="category-item">수다</div>
                <div className="category-item">베이커리</div>
                <div className="category-item">애견동반</div>
              </div>
            </div>
            <div className="cafe-img">
              <img src="/Assets/test.png" alt="" />
            </div>
          </div>
        </div>
        <div className="reserve-seat-btn" onClick={gotoReservationPage}>
          좌석 예약하기
        </div>
      </div>
    </>
  );
}

export default CafeInfoPopup;
