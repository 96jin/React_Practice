const fs = require('fs')
const appRoot = require("app-root-path")
// 루트경로를 찾아준다.

const accessLogStream = fs.createWriteStream(
  `${appRoot}/log/acces.log`,
  {flags : "a"}
)

module.exports = accessLogStream