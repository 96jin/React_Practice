import React from 'react'
import { Link } from 'react-router-dom';
import './css/home.css'

export default function Home() {
  window.scrollTo(0,0)
  return (
    <Link to='/'>
      <div className='home'>홈 화면입니다.</div>
    </Link>
  )
}
