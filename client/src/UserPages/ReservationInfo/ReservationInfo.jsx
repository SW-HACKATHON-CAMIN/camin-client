import React, { useState } from "react";

import "./ReservationInfo.css";

function ReservationInfo() {
  const [reservatedData, setReservatedData] = useState([
    {
      id: 1,
      infoImage: "/Assets/test.png",
      cafeName: "오츠에스프레소1",
      seatName: "1인석",
      orderMenu: "아인슈페너",
    },
    {
      id: 2,
      infoImage: "/Assets/test.png",
      cafeName: "오츠에스프레소2",
      seatName: "룸",
      orderMenu: "아인슈페너",
    },
    {
      id: 3,
      infoImage: "/Assets/test.png",
      cafeName: "오츠에스프레소3",
      seatName: "다인석",
      orderMenu: "아인슈페너",
    },
    {
      id: 4,
      infoImage: "/Assets/test.png",
      cafeName: "오츠에스프레소3",
      seatName: "다인석",
      orderMenu: "아인슈페너",
    },
    {
      id: 5,
      infoImage: "/Assets/test.png",
      cafeName: "오츠에스프레소3",
      seatName: "다인석",
      orderMenu: "아인슈페너",
    },
  ]);
  return (
    <div className="reservation-container">
      <div className="reservation-title">좌석 예약내역</div>
      <div className="reservation-list">
        {reservatedData.map((list) => {
          return (
            <div className="reservation-card">
              <div className="reservation-cage-img-box">
                <img
                  className="reservation-cafe-img"
                  src={list.infoImage}
                  alt=""
                />
              </div>
              <div className="reservation-info">
                <div className="reservation-cafe-name">
                  <div className="info-type">카페</div>
                  <div className="info-detail">{list.cafeName}</div>
                </div>
                <div className="reservation-cafe-seat">
                  <div className="info-type">좌석</div>
                  <div className="info-detail">{list.seatName}</div>
                </div>
                <div className="reservation-cafe-menu">
                  <div className="info-type">메뉴</div>
                  <div className="info-detail">{list.orderMenu}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReservationInfo;
