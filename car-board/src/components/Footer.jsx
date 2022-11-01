import React, { useRef } from 'react'
import './css/footer.css'

export default function Footer({buttonLen,pageNum,setPageNum}) {
  const btnRef = useRef()
  const btnArr = []

  let i = 1;
  while(i<=buttonLen){
    btnArr.push(i)
    i++
  }
  

  const handlePrev = () => {
    setPageNum(pageNum - 1)
  }

  const handleMorePrev = () => {
    setPageNum(Math.floor(pageNum/10)*10-9)
  }

  const handleNext = () => {
    setPageNum(pageNum + 1)
  }

  const handleMoreNext = () => {
    setPageNum(Math.floor(pageNum/10)*10+11)
  }

  return (
    <div className='footer'>
      <div className='btn-total-box'>
        <button className='btn-list' onClick={handleMorePrev} disabled={pageNum<=10}
        
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
            <button key={num} ref={btnRef} style={{
              transform:`translateY(-${30 * Math.floor((pageNum-1)/10)}px)`,
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
        <button onClick={handleMoreNext} className='btn-list' disabled = {pageNum>80}
        >
          {'>>'}
        </button>
      </div>
    </div>
  )
}
