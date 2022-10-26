import React from 'react'
import { useContext } from 'react';
import { ThemeContext } from './../context/ThemeContext';

export default function Footer() {
  const {isDark,setIsDark} = useContext(ThemeContext)
  // context로 전달한 정보를 받아오려면 useContext 훅을 사용하면 된다.
  // 인자로는 우리가 만들어준 ThemeContext를 넣어둔다.
  const toggleTheme = () => {
    setIsDark(!isDark)
  }
  return (
    <footer
      className='footer'
      style={{
        backgroundColor: isDark ? 'black' : 'lightgray',
      }}
    >
      <button className='button' onClick={toggleTheme}>
        Dark Mode
      </button>
    </footer>
  )
}
