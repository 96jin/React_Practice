import React, { useEffect, useState } from 'react'
import './css/footer.css'

export default function Footer({buttonLen,pageNum,setPageNum}) {
  const btnArr = []
  const [pageNumLength, setPageNumLength] = useState(10)
  let i = 1;
  while(i<=buttonLen){
    btnArr.push(i)
    i++
  }
  

  const handlePrev = () => {
    setPageNum(pageNum - 1)
  }

  const handleMorePrev = () => {
    setPageNum(Math.floor(pageNum/pageNumLength)*pageNumLength-(pageNumLength-1))
  }

  const handleNext = () => {
    setPageNum(pageNum + 1)
  }

  const handleMoreNext = () => {
    if(buttonLen - pageNum < 9){
      setPageNum(buttonLen)
      
      return
    }
    setPageNum(Math.floor(pageNum/pageNumLength)*pageNumLength+(pageNumLength+1))
  }

  useEffect(() => {
    window.scrollTo({top:0,left: 0,behavior:'smooth'})
    // window 의 너비값 변경 감지
    window.innerWidth < 540 ? setPageNumLength(3) : setPageNumLength(10)
  },[pageNum])

  return (
    <div className='footer'>
      <div className='btn-total-box'>
        <button className='btn-list' onClick={handleMorePrev} disabled={pageNum<=pageNumLength}
        >
          {'<<'}
        </button>
        <button className='btn-list' onClick={handlePrev} disabled={pageNum === 1}
        >
          {'<'}
        </button>
        <div className='btn-list-box'>
        {btnArr.map((num) => {
          return (
            <button key={num}  style={{
              transform:`translateY(-${30 * Math.floor((pageNum-1)/pageNumLength)}px)`,
            }}
            className={(pageNum === num) ? 'btn-list clicked':'btn-list'} 
            onClick={()=>setPageNum(num)} 
            >
              {num}
            </button>
          )
        })}
        </div>
        <button className='btn-list' onClick={handleNext} disabled={pageNum === buttonLen} 
        >
          {'>'}
        </button>
        <button onClick={handleMoreNext} className='btn-list' disabled = {pageNum>=buttonLen}
        >
          {'>>'}
        </button>
      </div>
    </div>
  )
}
