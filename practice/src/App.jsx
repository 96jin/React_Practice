import './App.css';
import axios from 'axios'

function App() {

  const selectAll = async() => {
    const result = await axios.get('/movies')
    console.log(result)
  }

  const selectWhere = async() => {
    const result = await axios.get('/movies/'+2)
    console.log(result)
  }

  const addData = async() => {
    const addObj = {title:'극한직업', director:'송병호', running_time:125}
    const result = await axios.post('/movies', addObj)
    console.log(result)
  }

  const updateData = async() => {
    const updateObj = {id:3, director:'성시경', running_time:118}
    const result = await axios.put('/movies', updateObj)
  }

  const deleteData = async() => {
    const deleteObj = {id:3}
    const result = await axios.delete('/movies',{data:deleteObj})
    // delete는 객체 전달할떄 object 형식으로 감싸서 data에 넣어주면 객체 전달 가능
  }


  return (
    <div className="App">
      <button onClick={selectAll}>모두 조회</button>
      <button onClick={selectWhere}>조건 조회</button>
      <button onClick={addData}>추가</button>
      <button onClick={updateData}>수정</button>
      <button onClick={deleteData}>삭제</button>
    </div>
  );
}

export default App;
