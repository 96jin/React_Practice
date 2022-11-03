import React, { useEffect, useRef, useState } from 'react'
import './css/board.css'
import Footer from './Footer';
import { Link, } from 'react-router-dom';

export default function Board({postList,totalCar,buttonLen,pageNum,setPageNum,carMaker,setEasySearchMaker,easySearchMaker}) {
  const searchRef = useRef([])
  const rightDownRef = useRef()
  const [isShowEasySearch, setIsShowEasySearch] = useState(false)
  const [isShowMaker, setIsShowMaker] = useState(false)
  const [isShowDistance, setIsShowDistance] = useState(false)
  const [isShowYear, setIsShowYear] = useState(false)
  const [isShowPrice, setIsShowPrice] = useState(false)

  useEffect(() => {
    rightDownRef.current.scrollTop=0
  },[pageNum])

  const easyMenuCont = () => {
    function checkFlag(isState, setState){
      isState && setState(!isState)
    }
    checkFlag(isShowMaker, setIsShowMaker)
    checkFlag(isShowDistance, setIsShowDistance)
    checkFlag(isShowPrice, setIsShowPrice)
    checkFlag(isShowYear, setIsShowYear)
    setIsShowEasySearch(!isShowEasySearch)
  }

  const checkMaker = (e) => {
    // console.log(e.target.textContent)
    // console.log(easySearchMaker.maker.indexOf(e.target.textContent))
    if(easySearchMaker.maker.indexOf(e.target.textContent) === -1){
      setEasySearchMaker({...easySearchMaker,
        maker:[...easySearchMaker.maker, e.target.textContent]})
    }
    else{
      setEasySearchMaker({...easySearchMaker,
        maker :easySearchMaker.maker.filter((newmaker)=>newmaker !== e.target.textContent)})
    }
  }

  return ( 
    <>
      <main className='board'>
        <div className='left'>
          <div className='left-title' onClick={easyMenuCont}>
            <h1>간편 검색</h1>
          </div>
          <div className={!isShowEasySearch ?'easy-search-box' : 'easy-search-box-show'}>
            <div className={!isShowEasySearch ? 'maker-search' : (!isShowMaker ? 'maker-search' : 'maker-search-show')}>
              <div className='search-box-style' onClick={()=>setIsShowMaker(!isShowMaker)}>제조사</div>
              <div className={!isShowEasySearch ? 'maker-wrap is-hidden' : (!isShowMaker ? 'maker-wrap is-hidden' : 'maker-wrap')}
                  ref={el=>searchRef.current[0]=el}>
                  {carMaker.map((maker,i)=>(
                <div key={i} onClick={(e)=>checkMaker(e)}
                  className = {(easySearchMaker.maker.indexOf(maker)>-1) ? 'checked' : ''}
                >
                  {maker}
                </div>
                ))}
              </div>
            </div>
            <div className={!isShowEasySearch ? 'distance-search' : (!isShowDistance ? 'distance-search' : 'distance-search-show')}>
              <div className='search-box-style' onClick={()=>setIsShowDistance(!isShowDistance)}>주행 거리</div>
              <div className='distance-wrap' ref={el=>searchRef.current[1]=el}>
                <input type="number" min="0" step="1000" placeholder='최소'/>
                <input type="number" step="1000" placeholder='최대'/>
              </div>            
            </div>
            <div className={!isShowEasySearch ? 'year-search' : (!isShowYear ? 'year-search' : 'year-search-show')}>
              <div className='search-box-style' onClick={()=>setIsShowYear(!isShowYear)}>년식</div>
              <div className='year-wrap' ref={el=>searchRef.current[2]=el}>
                <input type="number" min="0" step="1000" placeholder='최소'/>
                <input type="number" step="1000" placeholder='최대'/>
              </div>
            </div>
            <div className={!isShowEasySearch ? 'price-search' : (!isShowPrice ? 'price-search' : 'price-search-show')}>
              <div className='search-box-style' onClick={()=>setIsShowPrice(!isShowPrice)}>가격</div>
              <div className='price-wrap' ref={el=>searchRef.current[3]=el}>
                <input type="number" min="0" step="1000" placeholder='최소'/>
                <input type="number" step="1000" placeholder='최대'/>
              </div>
            </div>
          </div>
        </div>
        <div className='right'>
          <div className='right-up'>
            <h1>총 <span className='num-of-car'>{totalCar.toLocaleString('ko-KR')}</span>대</h1>
          </div>
          <div className='right-down' ref={rightDownRef}>
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
