import { useRef } from 'react';
import { useState } from 'react';
import './App.css';
import TodoBoard from './components/TodoBoard';

function App() {
  const [inputValue, setInputValue] = useState('')
  const [todoList, setTodoList] = useState([])

  const inputRef = useRef()

  const addItem = () => {
    setTodoList([...todoList,inputValue]) // 기존의 배열을 유지하고 새로운 값을 추가
    console.log(todoList)
    inputRef.current.focus()
    setInputValue('')
  }

  const handleKeydown = (e) => {
    if(e.keyCode == 13){
      setTodoList([...todoList,inputValue])
      inputRef.current.focus()
      setInputValue('')
    }
  }

  const onChangeInput = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <main>
      <input value={inputValue} type="text" 
      onChange={onChangeInput}
      onKeyDown={handleKeydown}
      ref = {inputRef}
      />
      <button onClick={addItem}>추가</button>
      <TodoBoard todoList={todoList} setTodoList={setTodoList}/>
    </main>
  );
}

export default App;
