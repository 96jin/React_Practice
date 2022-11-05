const express = require('express')

const app = express()

const PORT = process.env.PORT || 3500;

const db = require('./config/db.js')
app.use(express.json()) // body-parser 대신 express.json() 사용해도 된다.

app.get('/selectAll',(req,res) => {
  console.log('요청')
  db.query('select * from cars order by id desc',(err,data) => {
    if(!err){
      // console.log(data)
      res.send(data)
    }
    else{
      console.log(err)
    }
  })
})

app.post('/insertCar',(req,res) => {
  console.log(req.body)
  const {maker,model,year,distance,price,img} = req.body
  db.query('insert into cars (car_maker,car_name,car_model_year,distance,car_price,car_image) values (?,?,?,?,?,?)',[maker,model,year,distance,price,img],(err,data) => {
    if(!err){
      console.log('등록 완료')
      res.end()
    }
    else{
      console.log(err)
    }
  })
})

app.delete('/delete',(req,res) => {
  console.log(req.body)
  db.query(`delete from cars where id=${req.body.id}`,(err,data) => {
    if(!err){
      console.log('삭제 완료')
      res.end()
    }
    else{
      console.log(err)
    }
  })
})

app.listen(PORT , ()=>{
  console.log(`Server Connected : ${PORT}`)
})