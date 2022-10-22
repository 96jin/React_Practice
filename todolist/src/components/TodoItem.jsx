import React from 'react'


export default function TodoItem(props) {
  
  const handleDelete = () => {
    const newTodoList = props.todoList.filter((todo,index)=>(index !== props.index))
    console.log(newTodoList)
    console.log(props)
    props.setTodoList(newTodoList)
  }

  return (
    <div className='todoItem'>
      <span>{props.item}</span> 
      <br />
      <button onClick={handleDelete}>삭제</button>
    </div>
  )
}
