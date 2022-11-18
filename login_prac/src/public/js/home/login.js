const $id = document.getElementById('id')
const $pw = document.getElementById('pw')
const $form = document.querySelector('.login-form')

const login = (e) => {
  e.preventDefault()
  console.log($id.value)
  if(!$id.value) return alert('아이디를 입력해주세요')
  if(!$pw.value) return alert('비밀번호를 입력해주세요.')

  fetch(('/login'),{
    method:"POST",
    headers:{ // 데이터의 타입을 명시 json 타입으로 전달한다~를 헤더에 명시
      "Content-Type": "application/json"
    },
    body : JSON.stringify({ // key값과 value값이 모두 문자열로 감싸진다.
      id:$id.value, 
      pw:$pw.value
    }),
  })
  .then(res=>res.json())
  .then(res=>{
    if(res.success){
      window.location.href = '/ok'
    }
    else{
      if(res.err) return alert(res.err)
      alert(res.msg)
    }
  })
  .catch((err)=>{
    console.error(new Error('로그인 중 에러 발생'))
  })
}
$form.addEventListener('submit', login)