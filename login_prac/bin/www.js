const app = require('../app')
const logger = require('../src/config/logger')
const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
  // console.log(`Connected with ${PORT}`)
  logger.info(`${PORT} 포트 서버 가동`)
})
// app.listen 을 실행해야하므로 www.js를 실행해줘야한다.