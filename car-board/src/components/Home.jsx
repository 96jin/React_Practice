import React, { useEffect, useRef, useState } from 'react'
import './css/home.css'

export default function Home() {
  window.scrollTo(0,0)

  
  const [slideNum, setSlideNum] = useState(1)
  const [isFirstOrLast, setIsFirstOrLast] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const slideRef = useRef(1)
  let slidePre = '/img/banner'
  let slideSuf = '.png'
  let slideArr = [1,2,3,4,5]
  let realSlide = [slideArr[slideArr.length-1],...slideArr,slideArr[0]]
  let slideLen = realSlide.length



  const prevSlide = () => {
    setIsFirstOrLast(false)
    // clearInterval(slideTimer)
    if(slideNum === 1){
      setSlideNum(slideNum-1)
      setTimeout(()=>{
        setIsFirstOrLast(true)
        setSlideNum(slideLen-2)
      },400)
      return
    }
    setSlideNum(slideNum - 1)
  }
  const nextSlide = () => {
    if(slideRef.current===1) setIsFirstOrLast(false)
    
    if(slideRef.current >= slideLen-2){
      slideRef.current++
      setSlideNum(slideRef.current)
      setTimeout(()=>{
        setIsFirstOrLast(true)
        setSlideNum(slideRef.current)
      },400)
      slideRef.current = 1
      return
    }
    slideRef.current++
    setSlideNum(slideRef.current)
  }
  
  useEffect(() => {
    const a = setInterval(nextSlide,4000)
    if(a===6){
      clearInterval(a)
    }
  },[])

  console.log(slideRef.current)
  
  console.log(slideNum)
  return (
    <div className="home-wrap">
      <div className="banner-for-hide">
        <div className='slide-btn-prev' onClick={prevSlide}
        >
          {'<'}
        </div>
        <div className="banner" style={{
          width:slideLen * 100+'%', 
          transform:`translateX(-${(100/slideLen)*slideNum}%)`,
          transition:isFirstOrLast ? '0s' : '0.4s'
          }}>
          {realSlide.map((slide,i)=>(
            <img key={i} src={slidePre+slide+slideSuf} alt='banner' style={{width:(100/slideLen)+'%'}} />
          ))}
        </div>
        <div className='slide-btn-next' onClick={nextSlide}
        >
          {'>'}
        </div>
      </div>
    </div>
  )
}
