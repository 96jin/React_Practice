import './css/detailcar.css'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function DetailCar() {
  const etcInfo = useRef()
  const {id} = useParams()
  const [detailCar, setDetailCar] = useState([])
  
  // 세금 및 부대비용 체크용
  const [isClick, setIsClick] = useState(false)
  // 할부 기간 체크용
  const [period, setPeriod] = useState(36)

  // window.scrollTo(0,0)
  
  useEffect(() => {
    axios.get(`/selectWhere/${id}`).then((result)=>(setDetailCar(result.data)))
  },[id])

  if(!detailCar[0]){
    console.log('로딩중')
    return <div style={{fontWeight:'bold',fontSize:50,margin:'0 auto',width:'100%',height:'100vh',backgroundColor:'gray'}}>로딩중..</div>
  }
  const car = detailCar[0]
  const carPrice = car.car_price
  const carTax = Math.round(carPrice/10)
  const carFirstPay = isClick? Math.round(carPrice*0.3) + carTax : Math.round(carPrice*0.3)
  console.log(carPrice, carFirstPay, carTax)
  // etc hover
  const mouseOverEtc = () => {
    etcInfo.current.style.opacity = 1
    etcInfo.current.style.visibility='visible'
  }
  const mouseLeaveEtc = () => {
    etcInfo.current.style.opacity = 0
    etcInfo.current.style.visibility='hidden'
  }
  const checkPeriod = (e) => {
    setPeriod(e.target.value)
    console.log(period)
  }

  return  (
    <div className='detail-car-wrap'>
      <div className='detail-title-wrap'>
        <div className='detail-title-left'>
          <div className='detail-title'>
            <span>{car.car_maker} {car.car_name}</span>
          </div>
          <div className='detail-title-info'>
            <span>{car.car_model_year.slice(2,4)}년 {car.car_model_year.slice(5,7)}월식</span>
            <span>·</span>
            <span>{car.distance.toLocaleString('ko-KR')}km</span>
          </div>
        </div>
        <div className="detail-title-right">
          <div className='detail-title-price'>
            <strong>{carPrice.toLocaleString('ko-KR')}만원</strong>
            <div className='monthly-price-wrap'>
              <span>
                <span onMouseOver={mouseOverEtc} onMouseLeave={mouseLeaveEtc} className='etc-info-wrap'>
                  <img className='etc-img' 
                  src='/img/icon-etc-info.svg' alt='etc'/> 
                  <span className="etc-info" ref={etcInfo}>
                    예상 금액이며 변동될 수 있습니다. 자세한 내용은 상담원에게 문의해 주세요.
                  </span>
                </span>
                할부
                </span>
              <span className='monthly-price'> 월 {Math.ceil((carPrice+carTax)/48)}만원</span>
            </div>
          </div>
        </div>
      </div>
      <div className='detail-car-image'>
        <img src={car.car_image} alt="car" />
      </div>
      <div className="detail-car-info-wrap">
        <div className="detail-car-info-left">
          <div className='left-car-title'>
            <strong>{carPrice.toLocaleString('ko-KR')}만원</strong>
            <div>
              <span className='left-car-title-monthly-wrap'>할부 월 <span className='monthly-price'>{Math.ceil((carPrice+carTax)/48)}만원</span></span>
            </div>
          </div>
          <div className="left-car-options">
            <div className="left-car-basic-info">
              <span>기본정보</span>  
              <div>{car.car_model_year.slice(2,4)}년 {car.car_model_year.slice(5,7)}월식 </div>
            </div>
            <div className="left-car-distance">
              <span>주행거리</span>
              <div>{car.distance.toLocaleString('ko-KR')}km</div>
            </div>
            <div className="left-car-distance">
              <span>진단결과</span>
              <div>무사고</div>
            </div>
          </div>
          <div className='total-cal'>
            <div className='cal-first'>
              <div className='expected-price'>
                <strong>차량 예상 가격</strong><br />
                <input type="text" disabled={true} value={carPrice.toLocaleString('ko-KR')+' 만원'} />
              </div>
              <div className="first-pay">
              <strong>선수금</strong><br />
                <input type="text" disabled={true} value={carFirstPay.toLocaleString('ko-KR')+' 만원'}/>
              </div>
            </div>
            <div className='car-second'>
              <div>
                <input type="checkbox" id="tax" name="tax"/>
                <label htmlFor="tax" onClick={()=>setIsClick(!isClick)}>
                  <strong>세금 및 부대비용</strong>
                </label>
              </div>
              <span>{(carTax*1000).toLocaleString('ko-KR')}원</span>
            </div>
            <div className='monthly-period-wrap'>
              <strong>할부기간</strong>
              <div className='monthly-period'>
                <label htmlFor="period12">
                  <input type="radio" id='period12' name='period' className="period" value={12} onClick={(e)=>checkPeriod(e)}/>
                  12개월
                </label>
                <label htmlFor="period24">
                  <input type="radio" id='period24' name='period' className="period" value={24} onClick={(e)=>checkPeriod(e)}/>
                  24개월
                </label>
                <label htmlFor="period36">
                  <input type="radio" id='period36' name='period' className="period" defaultChecked={true} value={36} onClick={(e)=>checkPeriod(e)}/>
                  36개월
                </label>
                <label htmlFor="period48">
                  <input type="radio" id='period48' name='period' className="period" value={48} onClick={(e)=>checkPeriod(e)}/>
                  48개월
                </label>
                <label htmlFor="period60">
                  <input type="radio" id='period60' name='period' className="period" value={60} onClick={(e)=>checkPeriod(e)}/>
                  60개월
                </label>
              </div>
            </div>
            <div className='cal-final'>
              <div className="cal-final-left">
                <div>
                  <span className='final-left-text'>총 할부 신청금액</span>
                  <span className='final-left-price'>{((carPrice-carFirstPay)*10000).toLocaleString('ko-KR')} 원 </span>
                </div>
                <div>
                  <span className='final-left-text'>월 납부금 (예상)</span>
                  <span className='final-left-price'>{(Math.round((carPrice-carFirstPay)/period)*10000).toLocaleString('ko-KR')} 원</span>
                </div>
                <div>
                  
                </div>
              </div>
              <div className="cal-final-right">

              </div>
            </div>
          </div>
        </div>

        <div className="detail-car-info-right">
          <span>{car.car_maker}</span>
          <span>{car.car_name}</span>
          
        </div>

      </div>
      
    </div>
  ) 
}
