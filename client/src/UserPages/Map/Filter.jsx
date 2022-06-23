import React, { useState, useEffect } from 'react'
import "./filter.css"
import axios from 'axios'

function Filter(props) {

    const cafeInfoClose = () => {
        setIsOpen(false);
      };

    const [isOpen, setIsOpen] = useState(true);

    const [visiterNum, setVisiterNum] = useState(false);
    const [purpose, setPurpose] = useState(false);
    const [category, setCategory] = useState(false);
    const [experience, setExperience] = useState(false);

    useEffect(()=>{
        let visiterNumArr =[];
        let purposeArr =[];
        let categoryArr =[];
        let experienceArr =[];

        axios.get("/api/category").then(
            (response) => {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].type === 0){
                        visiterNumArr.push(response.data[i])
                        console.log(response.data[i])
                    }
                    if(response.data[i].type === 1){
                        purposeArr.push(response.data[i])
                        console.log(response.data[i])
                    }
                    if(response.data[i].type === 2){
                        categoryArr.push(response.data[i])
                        console.log(response.data[i])
                    }
                    if(response.data[i].type === 3){
                        experienceArr.push(response.data[i])
                        console.log(response.data[i])
                    }
                    setVisiterNum(visiterNumArr);
                    setPurpose(purposeArr);
                    setCategory(categoryArr);
                    setExperience(experienceArr);
                }
            }
        )
    },[])
   
  return (
    <div {...props}className={isOpen ? "show-background" : "hide-background"} onClick={cafeInfoClose}>
        <div className={isOpen ? "show-filter" : "hide-filter"}>
        <div className="cafe-filter-items">

            {
                !visiterNum?
                <></>:
                <div className='cafe-filter-each-items'>
                <span>방문 인원</span><br/>
                <div className="cafe-categories">
                    {
                        visiterNum.map(thisData => (
                            <div id={thisData.id} className='category-item'>
                                {thisData.name}
                            </div>
                        ))
                    }
                </div>
                <hr/>
                </div>
            }

            {
                !purpose?
                <></>:
                <div className='cafe-filter-each-items'>
                방문 목적
                <div className="cafe-categories">
                    {
                        purpose.map(thisData => (
                            <div id={thisData.id} className='category-item'>
                                {thisData.name}
                            </div>
                        ))
                    }
                </div>
                <hr/>
                </div>
            }

            {
                !category?
                <></>:
                <div className='cafe-filter-each-items'>
                    카테고리
                    <div className="cafe-categories">
                    {
                        category.map(thisData => (
                            <div id={thisData.id} className='category-item'>
                                {thisData.name}
                            </div>
                        ))
                    }
                    </div>
                    <hr/>
                    </div>
            }
         
            {
                !experience?
                <></>:
                <div className='cafe-filter-each-items'>
                분위기
                <div className="cafe-categories">
                    {
                        experience.map(thisData => (
                            <div id={thisData.id} className='category-item'>
                                {thisData.name}
                            </div>
                        ))
                    }
                </div>
                </div>
            }
            
            <div className='cafe-filter-each-items'>
            <div className="cafe-categories">
                <div className="filter-reset-btn">
                    필터 초기화
                </div>
                <div className='filter-apply-btn'>
                    적용하기
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>

  )
}

export default Filter;