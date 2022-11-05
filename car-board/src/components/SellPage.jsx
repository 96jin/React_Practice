import axios from 'axios'
import React, { useRef } from 'react'
import './css/sellpage.css'

export default function SellPage() {

  const inputInfo = useRef([])

  const handleSubmitCarInfo = async(e) => {
    e.preventDefault()
    const car_maker = inputInfo.current[0].value
    const car_model = inputInfo.current[1].value
    const car_year = inputInfo.current[2].value
    const car_distance = inputInfo.current[3].value
    const car_price = inputInfo.current[4].value
    const car_img = inputInfo.current[5].value
    const newCarInfo = {maker:car_maker, model:car_model, year:car_year, distance:car_distance, price:car_price, img:car_img }
    // const [car_maker,car_model,car_year,car_distance,car_price,car_img] = inputInfo.current[(cur)=>cur.value]
    await axios.post('/insertCar', newCarInfo)
    inputInfo.current.forEach((cur)=>cur.value = '')
    
  }

  return (
      <div className='sellpage-wrap'>
        <form className='submit-box' onSubmit={handleSubmitCarInfo}>
          <div>
            <label htmlFor="car-maker-input">제조사</label>
            <input type="text" id='car-maker-input' className="car-maker-input" ref={el=>inputInfo.current[0]=el}/>
          </div>
          <div>
            <label htmlFor="car-model-input">모델 명</label>
            <input type="text" id='car-model-input' className="car-model-input" ref={el=>inputInfo.current[1]=el}/>
          </div>
          <div>
            <label htmlFor="car-prod-year-input">년식</label>
            <input type="month" id='car-prod-year-input' className="car-prod-year-input" ref={el=>inputInfo.current[2]=el}/>
          </div>
          <div>
            <label htmlFor="car-distance-input">주행 거리</label>
            <input type="text" id='car-distance-input' className="car-distance-input" ref={el=>inputInfo.current[3]=el}/>
          </div>
          <div>
            <label htmlFor="car-price-input">가격</label>
            <input type="text" id='car-price-input' className="car-price-input" ref={el=>inputInfo.current[4]=el}/>
          </div>
          <div>
            <label htmlFor="car-img">사진</label>
            <input type="file" accept='image/*' id='car-img' className="car-img" ref={el=>inputInfo.current[5]=el}/>
          </div>
          <button>등록</button>
        </form>
      </div>
  )
}
