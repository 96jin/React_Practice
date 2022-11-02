import React, { useRef, useState } from 'react'
import { Link, } from 'react-router-dom'
import './css/header.css'

export default function Header({setSearchValue,setIsSearch,setPageNum}) {
  const [isMenuHide, setIsMenuHide] = useState(true)
  const inputRef = useRef()
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchValue(inputRef.current.value)
    inputRef.current.value=''
    setPageNum(1)
    setIsSearch(true)
  }
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
          <Link to="/"><img src="/img/logo3.png" alt="" /></Link>
        </div>
        <div className="nav">
          <div className='slide-bar'></div>
          <Link to='/sell'><div className='nav-list'>판매 등록</div></Link>
          <Link to='/buy'><div className='nav-list'>차 구매</div></Link>
          <Link to='review'><div className='nav-list'>후기</div></Link>
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
