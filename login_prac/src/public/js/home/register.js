const $register_form = document.getElementsByClassName('register-form')[0],
$name = document.getElementById('name'),
$id = document.getElementById('id'),
$pw = document.getElementById('pw'),
$pw2 = document.getElementById('pw2')

const register = (e) => {
  e.preventDefault()
  if(!$id.value){
    return alert('아이디를 입력해주세요')
  }
  if(!$pw.value){
    return alert('비밀번호를 입력해주세요')
  }
  if($pw.value !== $pw2.value){
    return alert('비밀번호가 같지 않습니다.')
  }
  const req = {
    name : $name.value,
    id : $id.value,
    pw : $pw.value,
    pw2 : $pw2.value
  }
  
  fetch(('/register'),{
      method:"POST",
      headers:{ // 데이터의 타입을 명시 json 타입으로 전달한다~를 헤더에 명시
        "Content-Type": "application/json"
      },
      body : JSON.stringify({ // key값과 value값이 모두 문자열로 감싸진다.
        name:$name.value,
        id:$id.value, 
        pw:$pw.value
      }),
    })
    .then(res=>res.json())
    .then(res=>{
        if(res.success){
            window.location.href = '/login'
          }
          else{
      alert(res.msg)
    }
  })
  .catch((err)=>{
      console.error(new Error('로그인 중 에러 발생'))
    })
  }

  $register_form.addEventListener('submit', register)