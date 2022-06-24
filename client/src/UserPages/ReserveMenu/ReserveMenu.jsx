import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import axios from "axios";

import "./ReserveMenu.css";

function ReserveMenu() {
  const [menuData, setMenuData] = useState([]);
  const cafeId = 1;

  useEffect(() => {
    axios
      .get(`/api/cafe/${cafeId}?userId=${sessionStorage.getItem("userId")}`)
      .then(function (response) {
        console.log(response.data.menus);
        setMenuData(response.data.menus);
      });
  }, []);

  //사장님 픽 상품
  const [ownerPickItem, setOwnerPickItem] = useState([]);
  const [isPickItem, setIsPickItem] = useState(false);
  const [checkItemNum, setCheckItemNum] = useState([]);
  const [checkButtonClicked, setCheckButtonClicked] = useState(false);

  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    //API넣기
    checkOwnerPick();
  }, []);

  useEffect(() => {
    ownerPickItem.filter((item, i) => {
      return (
        ownerPickItem.findIndex((item2, j) => {
          return item.id == item2.id;
        }) == i
      );
    });
  }, [ownerPickItem]);

  //메뉴 선택 변경시 리랜더링
  useEffect(() => {
    GetThisItemNum();
    setCheckButtonClicked(false);
  }, [checkButtonClicked]);

  //사장님 픽이 있는 지 검증& 선택 수량 체크를 위한 로직
  const checkOwnerPick = () => {
    menuData.map((thisData) => {
      if (!thisData.ownerPick == false) {
        setIsPickItem(true);
        setOwnerPickItem((data) => [...data, thisData]);

        //수량체크용
        var tmp = { id: thisData.id, num: 0 };
        setCheckItemNum((data) => [...data, tmp]);
      }
    });
  };

  //수량 체크
  const plusReserveList = (e) => {
    setCheckButtonClicked(true);

    var targetId = e.target.id;
    var targetPrice = 0;
    var itemNum = 0;
    var allItemList = JSON.parse(localStorage.getItem("itemList"));
    var different = true;

    //선택한 상품의 가격정보 받아오기
    menuData.map((thisData) => {
      if (thisData.id == targetId) {
        targetPrice = thisData.price;
      }
    });

    // //상태관리를 위한 숫자 기록
    // checkItemNum.map((thisData) => {
    //   if(thisData.id == targetId){
    //     thisData.num += 1;
    //   }
    // })

    //담은 상품이 없는 경우(새로 생성)
    if (!allItemList || allItemList == undefined) {
      allItemList = [{ itemId: targetId, itemNum: 1, itemPrice: targetPrice }];
      //로컬에 저장
      localStorage.setItem("itemList", JSON.stringify(allItemList));
      return;
    }
    //기존에 담은 상품이 있는 경우
    else {
      allItemList.map((thisData) => {
        //동일한 상품이 있는 경우 수량 갱신
        if (thisData.itemId == targetId) {
          thisData.itemNum += 1;
          different = false;
        }
      });

      //다른 상품을 추가하는 경우
      if (different) {
        allItemList.push({
          itemId: targetId,
          itemNum: 1,
          itemPrice: targetPrice,
        });
      }
    }

    //로컬에 저장
    localStorage.setItem("itemList", JSON.stringify(allItemList));
  };

  const minusReserveList = (e) => {
    setCheckButtonClicked(true);
    var targetId = e.target.id;
    var targetPrice = 0;
    var itemNum = 0;

    var allItemList = JSON.parse(localStorage.getItem("itemList"));

    //선택한 상품의 가격정보 받아오기
    menuData.map((thisData) => {
      if (thisData.id == targetId) {
        targetPrice = thisData.price;
      }
    });

    //담은 상품이 없는 경우(새로 생성)
    if (!allItemList) {
      return;
    }
    //기존에 담은 상품이 있는 경우
    else {
      allItemList.map((thisData) => {
        //동일한 상품이 있는 경우 수량 갱신
        if (thisData.itemId == targetId) {
          if (thisData.itemNum == 0) {
            return;
          }
          thisData.itemNum -= 1;
        }
      });
    }

    //로컬에 저장
    localStorage.setItem("itemList", JSON.stringify(allItemList));
  };

  //현재 상품의 개수 조회
  const GetThisItemNum = (target) => {
    var result = 0;
    var target = JSON.stringify(target);

    var allItemList = JSON.parse(localStorage.getItem("itemList"));

    //담은 상품이 없는 경우(새로 생성)
    if (allItemList == undefined) {
      return result;
    } else {
      allItemList.map((thisData) => {
        //동일한 상품이 있는 경우 수량 갱신
        if (thisData.itemId == target) {
          result = thisData.itemNum;
        }
      });
    }
    return result;
  };

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(totalCharge());
  }, [totalPrice]);

  const totalCharge = () => {
    //상품가격 조회
    var allItemList = JSON.parse(localStorage.getItem("itemList"));
    var total = 0;

    allItemList.map((thisData) => {
      var tmpNum = thisData.itemPrice;
      total += tmpNum;
    });
    return total;
  };

  //모달띄우기
  function OrderCheckModal(props) {
    const selectList = ["10분 뒤", "20분 뒤", "30분 뒤", "40분 뒤", "1시간 뒤"];
    const [Selected, setSelected] = useState("");

    const handleSelect = (e) => {
      setSelected(e.target.value);
    };

    // const headers = {
    //   "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    //   Authorization: "KakaoAK 9f9469b87e5666c1f2b544d2802e457b",
    // };

    const config = {
      next_redirect_mobile_url: "",
      tid: "",
      params: {
        cid: "TC0ONETIME",
        partner_order_id: "O202206231120216",
        partner_user_id: 1,
        item_name: "결제테스트",
        quantity: 5,
        total_amount: 8000,
        vat_amount: 0,
        tax_free_amount: 0,
        approval_url: "http://localhost:3000/reservationinfo",
        fail_url: "http://localhost:3000/reservation",
        cancel_url: "http://localhost:3000/reservation",
      },
    };

    const handlePay = () => {
      axios
        .post("https://kapi.kakao.com/v1/payment/ready", {
          config,
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization: "KakaoAK 9f9469b87e5666c1f2b544d2802e457b",
          },
        })
        .then(function (response) {
          if (response) {
            console.log(response);
            localStorage.removeItem('itemList');
            localStorage.removeItem('selectedSeat');
          }
        });
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="show-grid">
          <Container>
            {/* <Row>
              <div className="reserve-seat-title">예약좌석</div>
              <Col xs={14} md={8} />
            </Row>
            <Row>
              <div className="check-seat-category">
                <div className="check-seat-category-name">좌석유형 적어줘</div>
                <div className="check-seat-category-complexity">혼잡도</div>
              </div>
            </Row>
            <Row>
              <Col xs={4} md={4}>
                <div className="order-menu-title">주문메뉴</div>
              </Col>
              <Col xs={14} md={8} />
              <div className="order-menu-list">
                <ul>
                  <li className="order-item">123</li>
                  <li className="order-item">232</li>
                  <li className="order-item">32344</li>
                </ul>
              </div>
            </Row> */}
            <Row>
              <div className="time-select-box">
                <div className="visit-time-select">방문 예정 시간</div>
                <select
                  onChange={handleSelect}
                  value={Selected}
                  className="time-select-bar"
                >
                  {selectList.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <div className="total-price-box">
            <div className="price-text">총 주문금액: </div>
            <div className="total-price">{totalPrice} 원</div>
          </div>
          <Button onClick={handlePay}>결제하기</Button>
          <Button onClick={props.onHide}>취소</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="reserve-seat-container">
      <div>
        {menuData.map((thisMenu) => {
          return (
            <div className="menu-card">
              <div className="menu-img">
                <img src={thisMenu.menuImage} alt="" />
              </div>
              <div className="menu-info">
                <div className="menu-name">{thisMenu.name}</div>
                <div className="menu-price">{thisMenu.price}</div>
                <div className="menu-count">
                  <img
                    id={thisMenu.id}
                    className="buttonStyle"
                    src="/Assets/reserve/minus.png"
                    alt="minus"
                    onClick={minusReserveList}
                  />
                  {/* <GetThisItemNum target={thisMenu.id}/> */}
                  {GetThisItemNum(thisMenu.id)}
                  <img
                    id={thisMenu.id}
                    className="buttonStyle"
                    src="/Assets/reserve/plus.png"
                    alt="plus"
                    onClick={plusReserveList}
                  />
                </div>
                {/* <input */}
              </div>
            </div>
          );
        })}
      </div>
      <div className="order-frame">
        <div className="order-btn" onClick={() => setModalShow(true)}>
          주문하기
        </div>
      </div>

      <OrderCheckModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default ReserveMenu;
