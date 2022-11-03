import React, { useRef, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import './css/header.css'

export default function Header({setSearchValue,setIsSearch,setPageNum,setEasySearchMaker}) {
  const divBarRef = useRef([])
  const navListRef = useRef()
  let nav = useNavigate()
  // 페이지 이동시 buy 페이지 초기화
  const handleResetBuyPage = () => {
    inputRef.current.value=''
    setEasySearchMaker({
      maker:[],dis:[],price:[],year:[]})
    setIsSearch('')
    handleSlideBar(1)
  }
  
  const [isMenuHide, setIsMenuHide] = useState(true)
  const inputRef = useRef()
  // 검색기능 누르면
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchValue(inputRef.current.value)
    // inputRef.current.value=''
    setPageNum(1)
    setIsSearch(true)
    nav('/buy')
  }

  // 메뉴 언더바
  const handleSlideBar = (i) => {
    divBarRef.current.forEach((current,idx)=>{
      console.log(current)
      console.log(idx)
      if(i===idx){
        console.log(current)
        current.style.width = '100%'
      }
      else{
        current.style.width ='0px'
      }
    })
  }
  // handleSlideBar(1)

  return (
    <>
      <div className={isMenuHide ?'mobile-menu menu-hide' : 'mobile-menu'}>
        <Link to='/sell'>
          <span onClick={()=>setIsMenuHide(!isMenuHide)}>판매 등록</span>
        </Link>
        <Link to='/buy'>
          <span onClick={()=>setIsMenuHide(!isMenuHide)}>차 구매</span>
        </Link>
        <Link to='/review'>
          <span onClick={()=>setIsMenuHide(!isMenuHide)}>후기</span>
        </Link>
      </div>
      
      <div className='header'>
        <div className="logo">
          <Link to="/" onClick={()=>handleSlideBar()}>
            <img src="/img/logo3.png" alt="logo" />
          </Link>
        </div>
        <div className="nav">
          <Link to='/sell'>
            <div className='nav-list' ref={navListRef}
            onClick={()=>handleSlideBar(0)}
            >
            판매 등록
              <div ref={(el)=>divBarRef.current[0]=el}></div>
            </div>
          </Link>
          <Link onClick={handleResetBuyPage} to='/buy'>
            <div className='nav-list'         
            >
              차 구매 
              <div ref={(el)=>divBarRef.current[1]=el}></div>
            </div>
          </Link>
          <Link to='review'>
            <div className='nav-list'
            onClick={()=>handleSlideBar(2)}
            >
            후기
            <div ref={(el)=>divBarRef.current[2]=el}></div>
            </div>
          </Link>
        </div>
        <div className="search">
          <div className="hambergur">
            <span className='hamb-icon' onClick={()=>setIsMenuHide(!isMenuHide)}
            >≡
            </span>
          </div>
          <div className="search-area">
            <form onSubmit={handleSearch}>
              <input type="text" ref={inputRef} placeholder='ex) audi'/>
              <button className='search-btn'>
                <img src="./img/search.svg" alt="돋보기" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
