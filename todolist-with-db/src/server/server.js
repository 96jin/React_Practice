const express = require('express')

const app = express()
const PORT = process.env.PORT || 3500

const db = require('./config/db.js')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
// 4.16버전부터 express에서 bodyparser지원한다.
// app.use(express.json()) 라고 쓰면 된다.
// app.use(express.urlencoded({ extended: true })
// ↑ Js 에서 데이터를 주고받을때에는 객체 형태를 띄는데,
// 이는 객체형태로 전달된 데이터 내에서 또다른 중첩된 객체를
// 허용한다는 뜻이다.
// false일시 nodejs에 기본으로 내장된 queryStrint 사용,
// true일시 따로 설치가 필요한 npm qs 라이브러리를 사용한다.
// 따로 설치하지 않을거라면 false로 해야한다.

app.get('/selectAll', (req,res) => {
  db.query('select * from todolist', (err,data) => {
    if(!err){
      console.log(data)
      res.send(data)
    }
    else{
      console.log(err)
    }
  })
})

// app.get('/selectWhere',(req,res) => {
//   const 
//   db.query()
  
// })


app.post('/add', (req,res) => {
  const addList = req.body.addList
  console.log(addList)
  db.query(`insert into todolist (todo) values ('${addList}')`, (err,data) => {
    if(!err){
      console.log('입력완료')
      res.send(data)
    }
    else{
      console.log(err)
    }
  })
})

app.put('/checked',(req,res) => {
  const checked = req.body.checkedObj
  const idx = req.body.index
  console.log(checked,idx)
  db.query(`update todolist set checked=${checked} where idx=${idx}`,(err,data) => {
    if(!err){
      console.log('수정완료!')
      res.send(data)
    }
    else{
      console.log(err)
    }
  })
})


app.delete('/delete', (req,res) => {
  const deleteObj = req.body.index
  console.log(deleteObj+'dfdfd')
  db.query(`delete from todolist where idx='${deleteObj}'`,(err, data) => {
    if(!err){
      console.log(`제거 완료 : ${deleteObj}`)
      res.send(data)
    }
    else{
      console.log(err)
    }
  })
})

app.delete('/deleteWhere', (req,res) => {
  db.query('delete from todolist where checked = 1', (err,data) => {
    if(!err){
      console.log('선택 삭제 완료')
      res.send(data)
    }
    else{
      console.log(err)
    }
  })
})

app.delete('/deleteAll', (req,res) => {
  db.query('delete from todolist', (err,data) => {
    if(!err){
      console.log('전체 삭제')
      res.send(data)
    }
    else{
      console.log(err)
    }
  })
})

app.listen(PORT,() => {
  console.log(`Connected localhost : ${PORT}`)
})