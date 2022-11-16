class UserStorage{
  // static으로 해주면 클래스 자체에서 users 에 접근할 수 있다.
  static #users ={  // # 을 해주면 은닉화(private) 시켜줄 수 있다.
    id : ["aaa", "bbb", "ccc"],
    pw : ["1234", "1234", "1234"],
    nm : ["김삿갓", "아무개","개똥이"]
  }

  static getUsers(...fields){
    const users = this.#users
    const newUsers = fields.reduce((newUsers, field)=>{
      if(users.hasOwnProperty(field)){  // 해당 키값을 가지고 있으면~~
        newUsers[field] = users[field]
      }
      return newUsers
    },{})
    return newUsers
  }

  static getUserInfo(id){
    const users = this.#users
    const idx = users.id.indexOf(id)
    const usersKey = Object.keys(users) // users의 키값들만 배열로 만든다. => [id, pw, nm]
    const userInfo = usersKey.reduce((newUser, info)=>{
      newUser[info] = users[info][idx]
      return newUser
    },{})
    return userInfo
  }

  static save(userInfo){
    const users = this.#users
    users.id.push(userInfo.id)
    users.nm.push(userInfo.name)
    users.pw.push(userInfo.pw)
    console.log(users)
  }
}

module.exports = UserStorage