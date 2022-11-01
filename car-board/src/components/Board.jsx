import React from 'react'
import './css/board.css'


export default function Board({postList , totalCar}) {
  return ( 
    <main className='board'>
      <div className='left'>

      </div>
      <div className='right'>
        <h1>총 <span className='num-of-car'>{totalCar.toLocaleString('ko-KR')}</span>대</h1>
        <div className='right-down'>
          {postList.map((data)=>(
            <div className='post' key={data.id}>
              <div className='img'>
                <img src={data.car_image} alt="차량" />
              </div>
              <div className="car-info">
                <span>{data.car_maker +' '}{data.car_name}</span>
                <span style={{fontWeight:'bold'}}>{data.car_price.toLocaleString('ko-KR')}만원</span>
                <span style={{fontSize:14,color:'#54555a'}}>{data.car_model_year.slice(0,2)}년 {data.car_model_year.slice(5)}월식</span>
              </div>
            </div>
          ))}
      </div>
      </div>
    </main>
  )
}
