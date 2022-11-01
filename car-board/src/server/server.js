const express = require('express')

const app = express()

const PORT = process.env.PORT || 3500;

const db = require('./config/db.js')
app.use(express.json()) // body-parser 대신 express.json() 사용해도 된다.

app.get('/selectAll',(req,res) => {
  // console.log('요청')
  db.query('select * from cars',(err,data) => {
    if(!err){
      // console.log(data)
      res.send(data)
    }
    else{
      console.log(err)
    }
  })
})

app.listen(PORT , ()=>{
  console.log(`Server Connected : ${PORT}`)
})