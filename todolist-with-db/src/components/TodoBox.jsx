import axios from 'axios'
import React, { useRef } from 'react'

export default function TodoBox(props) {
  const todoListRef = useRef()
  let clickFlag = 0

  const handleClickDone = () => {
    if(!clickFlag){
      todoListRef.current.style.textDecoration = 'line-through'
      todoListRef.current.style.backgroundColor = 'gray'
      clickFlag = 1
    }
    else{
      todoListRef.current.style.textDecoration = 'none'
      todoListRef.current.style.backgroundColor = 'bisque'
      clickFlag = 0
    }
  }

  const handleClickDelete = async() => {
    const deleteObj = {deleteObj : props.todoList}
    // console.log(deleteObj)
    await axios.delete('/delete',{data : deleteObj})

    const deletedTodoList = props.todoListArr.filter((todos,index)=>(
      props.index !== index
    ))
    props.setTodoList(deletedTodoList)
  }


  return (
    <>
      <div className='todoBox' onClick={handleClickDone} ref={todoListRef}>
        {props.todoList}
      </div>
      <button onClick={handleClickDelete}>삭제</button>
    </>
  )
}
