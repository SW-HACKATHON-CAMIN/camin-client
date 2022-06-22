import React from 'react'
// import "./css/bootstrap.css";
// import "./css/main.css";
// import "./lib/metismenu/metisMenu.css";
// import "./lib/onoffcanvas/onoffcanvas/css";
// import "./lib/animate.css/animate.css";
// import "./css/style-switcher.css";
// import "./less/theme.less";
// import "./js/less.js";

// import Swal from 'sweetalert2';
// import { useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CafeInfo.css';
import { useState } from 'react';

function CafeInfo() {
  const [thisCafeName, setThisCafeName] = useState("");
  const [thisphone, setThisphone] = useState("");
  const [thisAddress, setThisAddress] = useState("");
  const [thisInstruction, setThisInstruction] = useState("");
  const [thisEvent, setThisEvent] = useState("");


  const onChangethisCafeName = (e) =>{
    const cafename = e.target.value;

    setThisCafeName(cafename);
  }

  const onChangethisphone = (e) =>{
    const userphone = e.target.value;

    setThisphone(userphone);
  }

  const onChangethisAddress = (e) =>{
    const  userAddress= e.target.value;

    setThisAddress(userAddress);
  }

  const onChangethisInstruction = (e) =>{
    const userInstruction = e.target.value;

    setThisInstruction(userInstruction);
  }

  const onChangethisEvent = (e) =>{
    const userEvent = e.target.value;

    setThisEvent(userEvent);
  }

  const onImgChange = async (event) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
  
  }


  return (
    <div className="wrap">
          <div className='head'>
    
          
                <Container>
                  <Row>
                    <Col>매장명</Col>
                  </Row>
                  <Row>
                    <Col><span><a href="cafeInfo.html">정보수정</a></span></Col>
                    <Col><span><a href="table.html">매장운영</a></span></Col>
                  </Row>
                </Container>       
   
                <br/>

        
              
          </div>
          <div className='content'>
          <Form>
          
          <Container>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <label>카페이름
                  <Form.Control type="text" name="cafeName" placeholder="카페 명" onChange={onChangethisCafeName}/>
                  <Form.Text className="text-muted">
                  고객님께 노출될 카페 이름을 설정해주세요.
                  </Form.Text>
                  </label>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>매장연락처</Form.Label>
                  <Form.Control type="tel" name="phone" placeholder="02-1234-5678" onChange={onChangethisphone}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>매장 주소</Form.Label>
                  <Form.Control type="text" name="address" placeholder="매장주소를 입력해주세요." onChange={onChangethisAddress} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>매장 소개 글</Form.Label>
                  <Form.Control type="text" name="instruction" placeholder="매장 소개글을 입력해주세요." onChange={onChangethisInstruction} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>프로모션</Form.Label>
                  <Form.Control type="text" name="event" placeholder="이벤트/프로모션을 입력해주세요." onChange={onChangethisEvent}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>카페 도면</Form.Label>
                 <input ref={logoImgInput} type="file" id="logoImg" accept="image/*" name="file" onChange={onImgChange} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>카테고리</Form.Label>
                  <Form.Control type="text" name="" placeholder="이벤트/프로모션을 입력해주세요." />
              </Form.Group>
            </Row>


            <Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>카페 내부 이미지</Form.Label>
                  <Form.Control type="text" name="event" placeholder="이벤트/프로모션을 입력해주세요." />
              </Form.Group>
            </Row>
              <Button variant="primary" type="submit">
                  Submit
              </Button>           
                  </Container>
              </Form>
          </div>

        <div className='left'>
          <div className="leftWrap">
            <div className="item">
              <a href="">매장정보 수정</a>
            </div>
            <div className="item">
              <a href="">메뉴 수정</a>
            </div>
          </div>
          </div>

          <div className="foot">

          </div>

      {/* <div class="bg-dark dk" id="wrap">
                <div id="top">
        
                    <nav class="navbar navbar-inverse navbar-static-top">
                        <div class="container-fluid">
                    
                    
           
                            <header class="navbar-header">
                    
                                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>

                    
                                <a href="index.html" class="navbar-brand"></a>
                    
                            </header>
                    
                            <div class="collapse navbar-collapse navbar-ex1-collapse">
                    
                
                                <ul class="nav navbar-nav">
                                    <li><a href="cafeInfo.html">정보수정</a></li>
                                    <li><a href="table.html">매장운영</a></li>
                                </ul>
           
                            </div>
                        </div>
      
                    </nav>
 
                    
                </div>

                    <div id="left">
                        <div class="media user-media bg-dark dker">
                            <div class="user-media-toggleHover">
                                <span class="fa fa-user"></span>
                            </div>
                            <div class="user-wrapper bg-dark">
                        
                                <div class="media-body">
                                    <h5 class="media-heading">매장명</h5>
                                    <ul class="list-unstyled user-info">
                                        <li><a href="">사장님</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <ul id="menu" class="bg-blue dker">
                          
                          <li class="nav-header"><h5>정보 수정하기</h5></li>
                          <li class="nav-divider"></li>
                          <li class="">
                            <a href="cafeInfo.html">
                              <i class="fa fa-dashboard"></i><span class="link-title">&nbsp;매장/좌석</span>
                            </a>
                          </li>
                          <li class="">
                            <a href="cafeMenu.html">
                              <i class="fa fa-dashboard"></i><span class="link-title">&nbsp;메뉴</span>
                            </a>
                          </li>
                      
                        </ul>

                    </div>

                <div id="content">
                    <div class="outer">
                        <div class="inner bg-light lter">
                            <div class="col-lg-12">
                            <h1>매장정보입력</h1>
                            
                

                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <footer class="Footer bg-dark dker">
                <p>(주)카페의 민족</p>
            </footer>

            <div id="helpModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">Modal title</h4>
                        </div>
                        <div class="modal-body">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>

            </div> */}
    </div>
  )
}

export default CafeInfo