import React from 'react'
import TodoItem from './TodoItem';

export default function TodoBoard(props) {
  return (
    <div>
      <h1>Todo List</h1>
      {props.todoList.map((item,i)=>
      (<TodoItem key={i} index={i} item={item} todoList={props.todoList} setTodoList={props.setTodoList}/>))}
    </div>
  )
}
