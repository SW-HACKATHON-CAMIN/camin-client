import React, { useState } from "react";

import "./ReserveMenu.css";

function ReserveMenu() {
  //사장님 픽 상품
  const [ownerPickItem, setOwnerPickItem] = useState([]);
  const [isPickItem, setIsPickItem] = useState(false);

  const [menuData, setMenuData] = useState([
    {
      id: 1,
      cafe: "오츠에스프레소",
      name: "아메리카노",
      price: 4000,
      ownerPick: false,
      menuImg: "이미지1"
    },
    {
      id: 1,
      cafe: "오츠에스프레소",
      name: "카페라떼",
      price: 4500,
      ownerPick: false,
      menuImg: "이미지2"
    },
    {
      id: 1,
      cafe: "오츠에스프레소",
      name: "아인슈페너",
      price: 5000,
      ownerPick: true,
      menuImg: "이미지3"
    },
    {
      id: 1,
      cafe: "오츠에스프레소",
      name: "카라멜마끼아또",
      price: 4500,
      ownerPick: false,
      menuImg: "이미지4"
    },
  ]);


  //사장님 픽이 있는 지 검증
  const checkOwnerPick = () => {
    menuData.map((thisData) => {
      if(!thisData.ownerPick === false){
        setIsPickItem(true);
        setOwnerPickItem(data => [...data, thisData]);
      }
    })
  }


  return (
    <div className="reserve-seat-container">
      {menuData.map((thisMenu) => {
        return (
          <div className="menu-card">
            <div className="menu-img">
              <img src={thisMenu.menuImg} alt={thisMenu.name} />
            </div>
            <div className="menu-info">
              <div className="menu-name">{thisMenu.name}</div>
              <div className="menu-name">{thisMenu.price}</div>
              {/* <input */}  
              <div className="menu-name">인원 수 만큼 음료를 구매해주세요.</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ReserveMenu;
