import React from "react";
import { Link } from "react-router-dom";

/* CSS Import */
import "./MainLayout.css";

function MainLayout(props) {
  const { View, Menu } = props;
  return (
    <div className="main-layout-container">
      <View {...props} />
      <div className="bottom-bar">
        {Menu === "Map" ? (
          <Link to="/map" className="selected">
            <div className="bottom-bar-icon">
              <img src="/Assets/BottomBarIcons/Map.png" alt="지도" />
              <div>지도</div>
            </div>
          </Link>
        ) : (
          <Link to="/map" className="not-selected">
            <div className="bottom-bar-icon">
              <img src="/Assets/BottomBarIcons/Map.png" alt="지도" />
              <div>지도</div>
            </div>
          </Link>
        )}
        {Menu === "FavoriteCafe" ? (
          <Link to="/favoritecafe" className="selected">
            <div className="bottom-bar-icon">
              <img src="/Assets/BottomBarIcons/Favorite.png" alt="찜한 카페" />
              <div>찜한 카페</div>
            </div>
          </Link>
        ) : (
          <Link to="/favoritecafe" className="not-selected">
            <div className="bottom-bar-icon">
              <img src="/Assets/BottomBarIcons/Favorite.png" alt="찜한 카페" />
              <div>찜한 카페</div>
            </div>
          </Link>
        )}
        {Menu === "ReservationInfo" ? (
          <Link to="/reservationinfo" className="selected">
            <div className="bottom-bar-icon">
              <img
                src="/Assets/BottomBarIcons/ReservationInfo.png"
                alt="예약내역"
              />
              <div>예약내역</div>
            </div>
          </Link>
        ) : (
          <Link to="/reservationinfo" className="not-selected">
            <div className="bottom-bar-icon">
              <img
                src="/Assets/BottomBarIcons/ReservationInfo.png"
                alt="예약내역"
              />
              <div>예약내역</div>
            </div>
          </Link>
        )}
        {Menu === "MyInfo" ? (
          <Link to="/myinfo" className="selected">
            <div className="bottom-bar-icon">
              <img src="/Assets/BottomBarIcons/MyInfo.png" alt="내 정보" />
              <div>my카민</div>
            </div>
          </Link>
        ) : (
          <Link to="/myinfo" className="not-selected">
            <div className="bottom-bar-icon">
              <img src="/Assets/BottomBarIcons/MyInfo.png" alt="내 정보" />
              <div>my카민</div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default MainLayout;
