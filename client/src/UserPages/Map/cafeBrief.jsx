import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './cafeBrief';

//카페 명, 주소, 카테고리, 혼잡도, 대표사진
export default function cafeBrief({cafeName, address, type, status, img }){
    
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
            <div className='frame'>
                <div className='title'>{cafeName}</div>
                <div className='address'>{address}</div>
                <div className='type'>{type}
                    {/* {
                        type.map(thisData => (
                            <span id="typeBox">{thisData}</span>
                        ))
                    } */}
                </div>
                <div className='mainImg'>
                    <img src={img} alt={cafeName+'이미지'}/>
                </div>
                <div className='reserve'>
                <Button id="reserveButton" variant="primary">좌석 예약하기</Button>
                </div>
            </div>
        </Card.Body>
      </Card>
    );
  }
