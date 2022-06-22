import React from "react";
import { Link } from "react-router-dom";

/* CSS Import */
import "./Main.css";

function Main() {
  return (
    <div className="main-container">
      <div className="main-wrapper">
        <div className="title-box">
          <div className="sub-title">2022 해커톤 1등(예정)플랫폼</div>
          <img src="/Assets/MainLogo/MainTitle.png" alt="카페의 민족" />
        </div>
        <div className="go-btn-box">
          <Link to="/map">
            <img src="/Assets/MainLogo/CupBtn.png" alt="카페보러가기" />
          </Link>
          <div className="gogo-text">
            <img src="/Assets/MainLogo/gogo.png" alt="카페보러가기" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
