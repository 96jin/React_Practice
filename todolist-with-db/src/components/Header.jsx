import React, { useRef, useState } from 'react'
import axios from 'axios'
import TodoBox from './TodoBox';
import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export default function Header() {
  const [inputValue, setInputValue] = useState('')
  const [todoList, setTodoList] = useState([])
  const [checkedList, setCheckedList] = useState([])
  const [listDbIdx, setListDbIdx] = useState([])
  
  const inputRef = useRef()

  // 화면에 그리기 위한 기능
  const handleClickSelect = async () => {
    const firstValue = await axios.get('/selectAll')
    const newList = firstValue.data.map((list)=>list.todo)
    const newListDbIdx = firstValue.data.map((list)=>list.idx)
    const newCheckedList = firstValue.data.map((list)=>list.checked)
    setTodoList(newList)
    setCheckedList(newCheckedList)
    setListDbIdx(newListDbIdx)
    console.log(listDbIdx)
  }
  
  // 렌더링 될 때 마다 
  useEffect(()=>{
    handleClickSelect()
    // axios.get('/selectAll').then(res=>setTodoList(res.data.map(list=>list.todo)))

    inputRef.current.focus()
  },[])
  
  // 키보드 입력, 엔터
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
      const firstValue = await axios.get('/selectAll')
      const newList = firstValue.data.map((list)=>list.todo)
      const newListDbIdx = firstValue.data.map((list)=>list.idx)
      const newCheckedList = firstValue.data.map((list)=>list.checked)
      setCheckedList(newCheckedList)
      setListDbIdx(newListDbIdx)
      setTodoList(newList)
      setInputValue('')
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
    const firstValue = await axios.get('/selectAll')
    const newList = firstValue.data.map((list)=>list.todo)
    const newListDbIdx = firstValue.data.map((list)=>list.idx)
    const newCheckedList = firstValue.data.map((list)=>list.checked)
    setCheckedList(newCheckedList)
    setListDbIdx(newListDbIdx)
    setTodoList(newList)
    setInputValue('')
    inputRef.current.focus()
  }

  // 선택 삭제
  const handleDeleteWhere = async () => {
    await axios.delete('/deleteWhere')
    const firstValue = await axios.get('/selectAll')
    const newList = firstValue.data.map((list)=>list.todo)
    const newListDbIdx = firstValue.data.map((list)=>list.idx)
    const newCheckedList = firstValue.data.map((list)=>list.checked)
    setCheckedList(newCheckedList)
    setListDbIdx(newListDbIdx)
    setTodoList(newList)
  }

  // 전체 삭제
  const handleDeleteAll = async () => {
    await axios.delete('/deleteAll')
    const firstValue = await axios.get('/selectAll')
    const newList = firstValue.data.map((list)=>list.todo)
    const newListDbIdx = firstValue.data.map((list)=>list.idx)
    const newCheckedList = firstValue.data.map((list)=>list.checked)
    setCheckedList(newCheckedList)
    setListDbIdx(newListDbIdx)
    setTodoList(newList)
  }
  return (
    <>
      <div className='header'>
        <div className='logo'>TodoList</div>
        <input value={inputValue}
          onChange={handleChangeInput} 
          onKeyDown={handleKeyDownInput}
          type="text" ref={inputRef} />
        <button className='addBtn' onClick={handleClickAdd}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <main>
        {todoList.map((todos,index) => (
        <TodoBox key={index}
        index={index} todoList={todos} todoListArr={todoList} setTodoList={setTodoList} 
        checkedList={checkedList} listDbIdx={listDbIdx[index]}
        setCheckedList={setCheckedList} handleClickSelect={handleClickSelect}
        
        />
        ))}
        <br />
        <div className='bottomBtn'>
          <button className='delSelect' onClick={handleDeleteWhere}>선택 삭제</button>
          <button className='delAll' onClick={handleDeleteAll}>전체 삭제</button>
        </div>
      </main>
    </>
    
  )
}
