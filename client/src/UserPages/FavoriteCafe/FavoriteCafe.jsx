import React, { useState, useEffect } from "react";
import axios from "axios";

import "./FavoriteCafe.css";

function FavoriteCafe() {
  const [favoriteData, setFavoriteData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(true);

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

  useEffect(() => {
    axios
      .get(
        `http://118.67.133.82:8080/api/user/favorite?userId=${sessionStorage.getItem(
          "userId"
        )}`
      )
      .then(function (response) {
        console.log(response);
        setFavoriteData(response.data);
      });
  }, []);

  return (
    <>
      <div className="favorite-container">
        <div className="favorite-title">찜한 카페</div>
        <div className="favorite-list">
          {favoriteData.map((list) => {
            return (
              <div className="favorite-card" key={list.id}>
                <div>
                  <img
                    className="favorite-cafe-img"
                    src={list.mainIamge}
                    alt=""
                  />
                </div>
                <div className="favorite-cafe-name-address">
                  <div className="favorite-cafe-name">{list.cafeName}</div>
                  <div className="favorite-cafe-address">{list.address}</div>
                </div>
                <div className="favorite-btn">
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
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FavoriteCafe;
