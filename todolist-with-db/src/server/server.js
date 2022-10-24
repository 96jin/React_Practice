const express = require('express')

const app = express()
const PORT = process.env.PORT || 3500

const db = require('./config/db.js')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

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

app.delete('/delete', (req,res) => {
  const deleteObj = req.body.deleteObj
  console.log(deleteObj+'dfdfd')
  db.query(`delete from todolist where todo='${deleteObj}'`,(err, data) => {
    if(!err){
      console.log(`제거 완료 : ${deleteObj}`)
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