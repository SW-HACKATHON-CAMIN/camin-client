import React, { useState } from "react";
import "./ReserveSeat.css";

function ReserveSeat() {
  const [seatData, setSeatData] = useState([
    {
      id: 1,
      seatName: "1인석",
      status: "혼잡",
    },
    {
      id: 2,
      seatName: "다인석",
      status: "혼잡",
    },
    {
      id: 3,
      seatName: "1인석",
      status: "혼잡",
    },
    {
      id: 4,
      seatName: "룸",
      status: "혼잡",
    },
    {
      id: 5,
      seatName: "룸",
      status: "혼잡",
    },
    {
      id: 6,
      seatName: "룸",
      status: "혼잡",
    },
  ]);

  const [isCardSelected, setIsCardSelected] = useState(false);
  const selectedSeat = (id) => {
    console.log(id)
    setIsCardSelected((isCardSelected) => !isCardSelected);
  };

  return (
    <>
      <div className="reserve-seat-container">
        {seatData.map((seat) => {
          return (
            <div
              className={
                isCardSelected
                  ? "seat-card card-selected"
                  : "seat-card card-not-selected"
              }
              onClick={()=>selectedSeat(seat.id)}
              key={seat.id}
            >
              <div className="seat-img">
                <img src="/Assets/seattest.png" alt="" />
              </div>
              <div className="seat-info">
                <div className="seat-name">{seat.seatName}</div>
                <div className="seat-status">{seat.status}</div>
                <div className="seat-text">
                  인원 수 만큼 음료를 구매해주세요.
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ReserveSeat;
