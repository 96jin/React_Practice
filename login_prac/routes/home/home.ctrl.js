"use strict"
// 콜백함수를 수행하는 이 부분을 컨트롤러 라고 한다.
const home = (req,res) => {
  res.render('home/index')
  // render는 ejs파일만 전송해준다.
}

const login = (req,res) => {
  res.render('home/login')
}

module.exports = {
  home,
  login,
}
// {home : home ,login : login} 과 같다