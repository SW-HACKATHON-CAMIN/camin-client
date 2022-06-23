import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./CafeInfoPopup.css";

function CafeInfoPopup({ cafeName, address, type, status, img }) {
  const [isOpen, setIsOpen] = useState(true);

  const cafeInfoClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="background" onClick={cafeInfoClose}></div>
      <div className={isOpen ? "show-cafe-info" : "hide-cafe-info"}>
        <div className="cafe-info-items">
          <div className="cafe-name-img-wrap">
            <div className="name-address-wrap">
              <div className="cafe-name">오츠에스프레소</div>
              <div className="cafe-address">
                서울특별시 마포구 독막로 14길 32
              </div>
              <div className="cafe-categories">
                <div className="category-item">혼자가기 적합</div>
                <div className="category-item">수다</div>
                <div className="category-item">베이커리</div>
                <div className="category-item">애견동반</div>
              </div>
            </div>
            <div className="cafe-img">
              <img src="/Assets/test.png" alt="" />
            </div>
          </div>
        </div>
        <div className="reserve-seat-btn">좌석 예약하기</div>
      </div>
    </>

    // <Card style={{ width: "18rem" }}>
    //   <Card.Body>
    //     <div className="frame">
    //       <div className="title">{cafeName}</div>
    //       <div className="address">{address}</div>
    //       <div className="type">
    //         {type}
    //         {/* {
    //                     type.map(thisData => (
    //                         <span id="typeBox">{thisData}</span>
    //                     ))
    //                 } */}
    //       </div>
    //       <div className="mainImg">
    //         <img src={img} alt={cafeName + "이미지"} />
    //       </div>
    //       <div className="reserve">
    //         <Button id="reserveButton" variant="primary">
    //           좌석 예약하기
    //         </Button>
    //       </div>
    //     </div>
    //   </Card.Body>
    // </Card>
  );
}

export default CafeInfoPopup;
