import React, { useRef, useState } from 'react'
import axios from 'axios'
import TodoBox from './TodoBox';

export default function Header() {
  
  const [inputValue, setInputValue] = useState('')
  const [todoList, setTodoList] = useState([])
  const [flag, setFlag] = useState(false)

  const inputRef = useRef()

  
  const handleClickSelect = async () => {
      const firstValue = await axios.get('/selectAll')
      const newList = firstValue.data.map((list)=>list.todo)
      console.log(newList)
      setTodoList(newList)
  }

  if(!flag){
    setFlag(true)
    handleClickSelect()
  }
  

  const handleChangeInput = (e) => {
    setInputValue(e.target.value)
    
  }
  const handleKeyDownInput = async(e) => {
    if(e.keyCode === 13){
      if(!inputValue){
        alert('내용을 입력하세요')
        return
      }
      setTodoList([...todoList,inputValue])
      const addObj = {addList : `${inputValue}`}
      await axios.post('/add',addObj)
      
      setInputValue('')
      inputRef.current.focus()
    }
  }

  const handleClickAdd = async() => {
    if(!inputValue){
      alert('내용을 입력하세요')
      return
    }
    setTodoList([...todoList,inputValue])
    const addObj = {addList : `${inputValue}`}
    await axios.post('/add',addObj)

    setInputValue('')
    inputRef.current.focus()

  }


  return (
    <>
      <div className='header'>
        <div className='logo'>TodoList</div>
        <input value={inputValue}
          onChange={handleChangeInput} 
          onKeyDown={handleKeyDownInput}
          type="text" ref={inputRef} />
        <button onClick={handleClickAdd}>추가</button>
        <button onClick={handleClickSelect}>조회</button>
      </div>
      <main>
        {todoList.map((todos,index) => (
        <TodoBox key={index} index={index} todoList={todos} todoListArr={todoList} setTodoList={setTodoList}/>
        ))}
      </main>
    </>
    
  )
}
