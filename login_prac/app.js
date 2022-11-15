const express = require('express')
const app = express()

const db = require('./config/db.js')

// 암호화
const bcrypt = require('bcrypt')
const saltRounds = 10

//app 세팅 기본 경로를 설정해준다. res.render()로 화면출력 가능
app.set("views", "./views")
app.set("view engine", "ejs")

// 라우팅
const home = require('./routes/home') // home 안에있는 index.js를 읽는다
app.use('/',home)
// use는 미들웨어를 등록하는 메서드

app.use(express.json())

// 세션관리 미들웨어 작성
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
// 요청된 쿠키를 쉽게 추출할 수 있도록 도와준다.

app.use(cors({
  origin:true,  // 데이터 요청을 하면 origin이라는 헤더를 포함하게된다. 이를 모두 허용해준다는 뜻, true가 아닌 특정 url을 적어도 된다.
  credentials:true  // credentials:true가 없는 헤더의 요청을 거부하는 사이트들(거의 대부분)을 방지하기 위해
}))
app.use(cookieParser())
app.use(
  session({
    key : "loginData",
    secret : "testSecret",
    resave : false,
    saveUninitialized: false,
    cookie:{
      expires : 60 * 60 * 24,
    }
  })
)
// 세션이 저장될 key 값을 정해주고, secret은 서명에 필요한 값. 이 두가지는 env파일에 저장하는것을 추천.
// resave 는 (간단하게) 수정이 되지 않아도 다시 저장을 할건지에 관한 내용
// saveUninitialized 는 false를 선택하면 로그인 세션을 구현하거나 서버 스토리지 사용량을 줄이거나 쿠키를 설정하기전에 권한이 필요한 법률을 준수하는데 유용하므로 false로 지정했다.
// cookie를 이용하여 session을 관리해주며 expires 로 쿠키가 얼마나 지속될건지 설정.



app.get('/register/:id&:pw&:name', (req,res) => {
  const info = [req.params.id, req.params.pw, req.params.name]
  const sql = 'insert into member values (?,?,?)'
  // bcrypt.hash는 비동기 콜백이므로 안에서 db.query 실행
  // bcrypt.hashSync 는 동기함수이고 리턴을 받아야한다.
  bcrypt.hash(info[1], saltRounds, (err , hashed) => {
    info[1] = hashed
    console.log('처음',info)
    db.query(sql,info, (err,data) => {
      if(!err){
        console.log('가입완료')
        res.end()
      }
      else{
        console.log(err)
      }
    })
  })
  console.log('두번째',info)
})



app.get('/login/:id&:pw', async(req,res) => {
  let {id,pw} = req.params
  const sql = 'select * from member where id = ?'
  db.query(sql,id,(err,row) => { // json의 배열 형태로 반환
    console.log(row)
    if(err){
      console.log(err)
    }
    if(row.length>0){ // id 가 존재할 때
      bcrypt.compare(pw,row[0].pw, (err,result) => {
        // compare문에서는 true / false를 반환해준다.
        if(result){ // 성공
          console.log('성공')
          res.redirect('F:/FrontEnd/React_practice/login_prac/ok.html')
        }
        else{       // 실패
          console.log('실패')
          res.send('F:/FrontEnd/React_practice/login_prac/ok.html')
        }
      })
    }
    else{
      console.log('id가 존재하지 않습니다.')
      res.send('id가 존재하지 않습니다.')
    }
  })
})

module.exports = app