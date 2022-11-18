const db = require('../config/db.js')

class UserStorage {
  // static으로 해주면 클래스 자체에서 users 에 접근할 수 있다.
  // static #users ={  // # 을 해주면 은닉화(private) 시켜줄 수 있다.
  //   id : ["aaa", "bbb", "ccc"],
  //   pw : ["1234", "1234", "1234"],
  //   nm : ["김삿갓", "아무개","개똥이"]
  // }
  
  static async getUsers(isAll, ...fields) {}

  static async getUserInfo(id) {
    // Promise 는 시간이 걸리는 비동기 작업을 처리할 때 써준다.
    return new Promise((resolve, reject)=>{
      const query = `select * from users where id = ?;`
      db.query(query,[id], (err,data) => {
        if(err) reject(`${err}`)
        else resolve(data[0]);
      })
    })
  }

  static async save(userInfo) {
    return new Promise((resolve, reject)=>{
      const query = `insert into users (id,name,pw) values (?,?,?);`
      db.query(query,[userInfo.id,userInfo.name,userInfo.pw], (err) => {
        if(err) reject(`${err}`)
        else resolve({success : true});
      })
    })
  }
}
module.exports = UserStorage;
