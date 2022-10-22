const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000

const db = require('./config/db.js')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/',(res,req)=>{
  console.log('root')
})

app.get('/movies',(req,res)=>{
  db.query(`select * from movie`,(err,data) => {
    if(!err){
      console.log(data)
      res.send(data)
    }
    else{
      console.log(err)
    }
  })
})

app.get('/movies/:id',(req,res)=>{
  db.query(`select * from movie where id = ${req.params.id}`,(err,data) => {
    if(!err){
      console.log(data)
      res.send(data)
    }
    else{
      console.log(err)
    }
  })
})

app.post('/movies',(req,res) => {
  console.log('post')
  console.log(req.body)
  const title = req.body.title
  const director = req.body.director
  const running_time = req.body.running_time
  db.query(`insert into movie (title,director,running_time) values ('${title}','${director}',${running_time})`),(err,data) => {
    if(!err){
      console.log('입력 완료')
      res.send(data)
    }
    else{
      console.log(err)
    }
  }
})

app.put('/movies',(req,res) => {
  const id = req.body.id
  const director = req.body.director
  const running_time = req.body.running_time
  db.query(`update movie set director="${director}",running_time=${running_time} where id=${id}`,(err,data) => {
    if(!err){
      console.log('수정 완료!')
    }
    else{
      console.log(err)
    }
  })
})

app.delete('/movies',(req,res) => {
  console.log(req.body)
  const id = req.body.id
  db.query(`delete from movie where id=${id}`,(err,data) => {
    if(!err){
      console.log('삭제 완료')
    }
    else{
      console.log(err)
    }
  })
})

app.listen(PORT,()=>{
  console.log(`Connecting succeeded : localhost:${PORT}`)
})