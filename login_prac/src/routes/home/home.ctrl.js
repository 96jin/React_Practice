"use strict"
const User = require('../../models/User')
// 콜백함수를 수행하는 이 부분을 컨트롤러 라고 한다.

// const users ={
//   id : ["aaa", "bbb", "ccc"],
//   pw : ["1234", "1234", "1234"],
// }
// 모델은 데이터를 가지고있는것 또는 데이터를 조작하고 로직을 처리하는 부분

const output = {
  home : (req,res) => {
    res.render('home/index')
    // render는 ejs파일만 전송해준다.
  },
  login : (req,res) => {
    res.render('home/login')
  },
  register : (req,res) => {
    res.render('home/register')
  },
  ok : (req,res) => {
    res.render('home/ok')
  }
}
const process = {
  login : async (req,res) => {
    const user = new User(req.body) // user의 인스턴스화
    const response = await user.login()
    // console.log(response)
    return res.json(response)

    // const id = req.body.id
    // const pw = req.body.pw
// res.json()의 반환값은 promise이다. 기본 res의 반환값은 response스트림인데, .json()메서드를 통해 응답스트림을 읽을 수 있다.
// response는 데이터가 모두 받아진 상태가 아니다. .json()으로 응답스트림을 가져와 완료될 때까지 읽는다.
// 다 읽은 body의 텍스트를 promise형태로 반환한다.
  
    // const users = UserStorage.getUsers("id","pw") // 데이터를 은닉화 시킨 후 메서드로 전달
    // if(users.id.includes(id)){
    //   const idx = users.id.indexOf(id)
    //   if(users.pw[idx] === pw){
    //     return res.json({ // json파일 형태로 응답
    //       success: true,
    //     })
    //   }
    // }
    // return res.json({
    //   success : false,
    //   msg : '로그인에 실패하셨습니다.'
    // })
  },
  register : async (req,res) => {
    const user = new User(req.body)
    const response = await user.register()
    return res.json(response)
  }
}

module.exports = {
  output,
  process,
}
// {home : home ,login : login} 과 같다