import React, { useState } from "react";

import "./FavoriteCafe.css";

function FavoriteCafe() {
  const [favoriteData, setFavoriteData] = useState([
    {
      id: 1,
      infoImage: "/Assets/test.png",
      cafeName: "오츠에스프레소1",
      address: "서울특별시 마포구 독막로 14길 32",
    },
    {
      id: 2,
      infoImage: "/Assets/test.png",
      cafeName: "오츠에스프레소2",
      address: "서울특별시 마포구 독막로 14길 32",
    },
    {
      id: 3,
      infoImage: "/Assets/test.png",
      cafeName: "오츠에스프레소3",
      address: "서울특별시 마포구 독막로 14길 32",
    },
  ]);
  return (
    <>
      <div className="favorite-container">
        <div className="favorite-title">찜한 카페</div>
        <div className="favorite-list">
          {favoriteData.map((list) => {
            return (
              <div className="favorite-card">
                <div>
                  <img
                    className="favorite-cafe-img"
                    src={list.infoImage}
                    alt=""
                  />
                </div>
                <div className="favorite-cafe-name-address">
                  <div className="favorite-cafe-name">{list.cafeName}</div>
                  <div className="favorite-cafe-address">{list.address}</div>
                </div>
                <div className="favorite-btn">
                  <img
                    src="/Assets/FavoriteSelectBtn/FavoriteSelected.png"
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FavoriteCafe;
