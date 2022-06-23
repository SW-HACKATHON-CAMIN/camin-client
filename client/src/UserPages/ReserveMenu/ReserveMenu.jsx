import React, { useState } from "react";

import "./ReserveMenu.css";

function ReserveMenu() {
  const [menuData, setMenuData] = useState([
    {
      id: 1,
      menuName: "1인석",
      price: "5900",
    },
    {
      id: 2,
      menuName: "다인석",
      price: "5900",
    },
    {
      id: 3,
      menuName: "1인석",
      price: "5900",
    },
    {
      id: 4,
      menuName: "룸",
      price: "5900",
    },
    {
      id: 4,
      menuName: "룸",
      price: "5900",
    },
  ]);

  return (
    <div className="order-menu-container">
      {menuData.map((seat) => {
        return (
          <div className="menu-card">
            <div className="menu-img">
              <img src="/Assets/seattest.png" alt="" />
            </div>
            <div className="menu-info">
              <div className="menu-name">{seat.seatName}</div>
              <div className="menu-price">{seat.status}</div>
              <div className="menu-text">인원 수 만큼 음료를 구매해주세요.</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ReserveMenu;
