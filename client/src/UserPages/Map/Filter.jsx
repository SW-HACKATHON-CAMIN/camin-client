import React, { useState, useEffect } from 'react'
import "./filter.css"
import axios from 'axios'

function Filter(props) {
    const [visiterNum, setVisiterNum] = useState("");
    const [purpose, setPurpose] = useState("");
    const [category, setCategory] = useState("");
    const [experience, setExperience] = useState("");

    useEffect(()=>{
        let visiterNumArr =[];
        let purposeArr =[];
        let categoryArr =[];
        let experienceArr =[];

        axios.get("/api/category").then(
            (response) => {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].type === 0){
                        visiterNumArr.push(response.data[i].type)
                    }
                }


            }
        )
    },[])
   

  return (
    <div className='filterBarFrame' {...props}>
        <div className='categoryFrame'>
            방문 인원
            <div className='category'>

            </div>
        </div>
        <div className='categoryFrame'>
            방문 목적
            <div className='category'>
                
            </div>
        </div>
        <div className='categoryFrame'>
            카테고리
            <div className='category'>
                
            </div>
        </div>
        <div className='categoryFrame'>
            분위기
            <div className='category'>
                
            </div>
        </div>
        <div className='categoryFrame'>
            <div id="filterReset">
                <img src="/Assets/map/초기화.png" alt="초기화"/>
            </div>
            <div className='filterApply'>
                <img src='/Assets/map/적용.png' alt='적용'/>
            </div>
        </div>
    </div>
  )
}

export default Filter;