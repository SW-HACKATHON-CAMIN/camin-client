import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./ReserveSeat.css";

function ReserveSeat() {
  const [seatData, setSeatData] = useState([]);

  const [isCardSelected, setIsCardSelected] = useState(false);

  const cafeId = 1;

  useEffect(() => {
    axios
      .get(`/api/cafe/${cafeId}?userId=${sessionStorage.getItem("userId")}`)
      .then(function (response) {
        console.log(response.data.sections);
        setSeatData(response.data.sections);
      });
  }, []);

  useEffect(() => {
    PrintSeat();
  }, [isCardSelected]);

  const selectedSeat = (id) => {
    console.log(id);
    setIsCardSelected(id);
    keepSeat(id);
  };

  //선택한 값을 장바구니에 저장
  const keepSeat = (id) => {
    //로컬스토리지에 저장
    localStorage.setItem("selectedSeat", id);
  };

  const PrintSeat = () => {
    return (
      <div className="reserve-seat-container">
        {seatData.map((seat) => {
          return (
            <div
              className={
                isCardSelected === seat.id
                  ? "seat-card card-selected"
                  : "seat-card card-not-selected"
              }
              onClick={() => selectedSeat(seat.id)}
              key={seat.id}
            >
              <div className="seat-img">
                <img src="/Assets/seattest.png" alt="" />
              </div>
              <div className="seat-info">
                <div className="seat-name">{seat.name}</div>
                <div className="seat-status">
                  {seat.status === "0" ? (
                    <div>여유</div>
                  ) : seat.status === "1" ? (
                    <div>보통</div>
                  ) : seat.status === "2" ? (
                    <div>혼잡</div>
                  ) : seat.status === "3" ? (
                    <div>만석</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="seat-text">
                  인원 수 만큼 음료를 구매해주세요.
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <PrintSeat />
    </>
  );
}

export default ReserveSeat;
