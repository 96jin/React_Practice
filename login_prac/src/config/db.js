const mysql = require('mysql')

const db = mysql.createPool({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PW,
  port : 3306,
  database : process.env.DB_DATABASE
})

module.exports = db