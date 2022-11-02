import React, {   } from 'react'
import './css/board.css'
import Footer from './Footer';
import { Link, } from 'react-router-dom';

export default function Board({postList,totalCar,buttonLen,pageNum,setPageNum,carMaker}) {
  
  console.log(carMaker)
  return ( 
    <>
      <main className='board'>
        <div className='left'>
          <div>
            <h1>간편 검색</h1>
          </div>
          <div>
            <span>제조사</span>
            <select>
              <option value="k8">k8</option>
            </select>
          </div>
          <div>
            <span>주행 거리</span><br />            
            <input type="number" min="0" step="1000" placeholder='최소'/>
            <input type="number" step="1000" placeholder='최대'/>
          </div>
          <div>
            <span>년식</span><br />
            <input type="number" min="0" step="1000" placeholder='최소'/>
            <input type="number" step="1000" placeholder='최대'/>
          </div>
          <div>
            <span>가격</span><br />
            <input type="number" min="0" step="1000" placeholder='최소'/>
            <input type="number" step="1000" placeholder='최대'/>
          </div>
        </div>
        <div className='right'>
          <div className='right-up'>
            <h1>총 <span className='num-of-car'>{totalCar.toLocaleString('ko-KR')}</span>대</h1>
          </div>
          <div className='right-down'>
            {postList.map((data)=>(
              <div className='post' key={data.id}>
                <div className='img'>
                  <Link to="/"><img src={data.car_image} alt="차량" /></Link>
                </div>
                <div className="car-info">
                  <span>{data.car_maker +' '}{data.car_name}</span>
                  <span style={{fontWeight:'bold'}}>{data.car_price.toLocaleString('ko-KR')}만원</span>
                  <span style={{fontSize:13,color:'#54555a'}}>{data.car_model_year.slice(0,2)}년 {data.car_model_year.slice(5)}월식 · {data.distance.toLocaleString('ko-KR')}km</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer buttonLen={buttonLen}
        pageNum={pageNum} setPageNum={setPageNum}
        />
    </>
  )
}
