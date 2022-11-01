import React from 'react'
import './css/board.css'

export default function Board({postList}) {
  return ( 
    <main className='board'>
      {postList.map((data)=>(
        <div className='post' key={data.id}>
          <div className='img'>
            <img src={data.car_image} alt="차량" />
          </div>
          <div className="car-info">
            <span>{data.car_maker +' '}{data.car_name}</span>
            <span>{data.car_model_year}</span>
            <span>{data.car_price}만원</span>
          </div>
        </div>
      ))}
    </main>
  )
}
