import React, { useState } from "react";
import { useEffect } from "react";

import "./ReserveMenu.css";

function ReserveMenu() {
  //사장님 픽 상품
  const [ownerPickItem, setOwnerPickItem] = useState([]);
  const [isPickItem, setIsPickItem] = useState(false);
  const [reserveList, setReserveList] = useState([]);

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
      id: 2,
      cafe: "오츠에스프레소",
      name: "카페라떼",
      price: 4500,
      ownerPick: false,
      menuImg: "이미지2"
    },
    {
      id: 3,
      cafe: "오츠에스프레소",
      name: "아인슈페너",
      price: 5000,
      ownerPick: true,
      menuImg: "이미지3"
    },
    {
      id: 4,
      cafe: "오츠에스프레소",
      name: "카라멜마끼아또",
      price: 4500,
      ownerPick: false,
      menuImg: "이미지4"
    },
  ]);

  useEffect(()=>{
    //API넣기

    checkOwnerPick()
  },[])

  useEffect(()=>{
    ownerPickItem.filter((item, i) => {
      return (
        ownerPickItem.findIndex((item2, j) => {
          return item.id == item2.id;
        }) === i
      );
    });
  },[ownerPickItem])


  //사장님 픽이 있는 지 검증
  const checkOwnerPick = () => {
    menuData.map((thisData) => {
      if(!thisData.ownerPick === false){
        setIsPickItem(true);
        setOwnerPickItem(data => [...data, thisData]);
      }
    })
  }

  //수량 체크
  const minusReserveList = (e) => {
    
    var targetId = e.target.id;
    var isValid = false;
    var itemPrice = 0
    var itemNum = 0
    var tmpArr = [];

    //가격정보 가져오기
    menuData.map((thisData) => {
      if(thisData.id === targetId){
        itemPrice = thisData.price;
      }
    });

    if(reserveList!== []){
      reserveList.map((thisData) => {
        if(targetId === thisData.id){
          isValid = true;
          if(thisData.num > 0){
            thisData.num += 1;
          }
          else{
            thisData.num = 1;
          }
        }
      })
    }

    //기존에 있는 값을 추가해야하는 경우
    if(isValid){

    }

    

  }

  const plusReserveList = (e) => {

  }


  return (
    <div className="reserve-seat-container">
      {
        !isPickItem?
        <div>
          {menuData.map((thisMenu) => {
            return (
              <div className="menu-card">
                <div className="menu-img">
                  <img src={thisMenu.menuImg} alt={thisMenu.name} />
                </div>
                <div className="menu-info">
                  <div className="menu-name">{thisMenu.name}</div>
                  <div className="menu-name">{thisMenu.price}</div>
                  <div className="menu-name">
                    <img id={thisMenu.id} src="/Assets/reserve/minus.png" alt="minus" onClick={minusReserveList}/>

                    <img id={thisMenu.id} src="/Assets/reserve/plus.png" alt="plus" onClick={plusReserveList}/>
                  </div>
                  {/* <input */}  
                </div>
              </div>
            );
          })}
        </div>:
        <div>
          <div>
            <div className="ownerPick">사장님 PICK!
            {ownerPickItem.map((thisMenu) => {
              return (
                <div className="ownerPick-card">
                  <div className="menu-img">
                    <img src={thisMenu.menuImg} alt={thisMenu.name} />
                  </div>
                  <div className="menu-info">
                    <div className="menu-name">{thisMenu.name}</div>
                    <div className="menu-name">{thisMenu.price}</div>
                    <div className="menu-name">{thisMenu.price}</div>
                    {/* <input */}  
                  </div>
                </div>
              );
            })}
            </div>
          </div>
          <div>
          {menuData.map((thisMenu) => {
            return (
              <div className="menu-card">
                <div className="menu-img">
                  <img src={thisMenu.menuImg} alt={thisMenu.name} />
                </div>
                <div className="menu-info">
                  <div className="menu-name">{thisMenu.name}</div>
                  <div className="menu-name">{thisMenu.price}</div>
                  <div className="menu-name">{thisMenu.price}</div>
                  {/* <input */}  
                </div>
              </div>
            );
          })}
        </div>
      </div>
      }
    </div>
  );
}

export default ReserveMenu;
