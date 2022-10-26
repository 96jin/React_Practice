import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

export default function TodoBox(props) {
  // 체크되어있는지 디비로부터 불러온 정보를 props에서 받아와서 초기값으로 넣어준다
  const clickFirstValue = props.checkedList[props.index]
  const [clickFlag, setClickFlag] = useState(clickFirstValue)
  const todoListRef = useRef()
  const forAnimationRef = useRef()
  
  // 클릭하면 체크
  const handleClickDone = async(e) => {
    console.log(props.listDbIdx)
    console.log(props.index)
    if(!clickFlag){
      // todoListRef.current.classList.add('checked')
      setClickFlag(1)
      const checkedObj = {checkedObj: 1, index : props.listDbIdx[props.index]}
      await axios.put('/checked',checkedObj)
      const newCheckedList = props.checkedList.map((v,i) => i === props.index ? v=checkedObj.checkedObj : v
      )
      props.setCheckedList(newCheckedList)
    }
    else{
      // todoListRef.current.classList.remove('checked')
      setClickFlag(0)
      const checkedObj = {checkedObj: 0, index : props.listDbIdx[props.index]}
      await axios.put('/checked',checkedObj)
      const newCheckedList = props.checkedList.map((v,i) => i === props.index ? v=checkedObj.checkedObj : v
      )
      props.setCheckedList(newCheckedList)
    }
    console.log(props.checkedList)
  }

  const handleDoubleClick = () => {
    prompt('변경할 값을 입력하세요')
  }
  
  // 삭제 기능
  const handleClickDelete = async() => {
    forAnimationRef.current.classList='forAnimationUp'
    console.log(forAnimationRef)
    forAnimationRef.current=null
    const deleteObj = {index : props.listDbIdx[props.index]}
    // console.log(deleteObj)
    await axios.delete('/delete',{data : deleteObj})
    // const deletedTodoList = props.todoListArr.filter((todos,index)=>(
      //   props.index !== index
      // ))
      // props.setTodoList(deletedTodoList)
      const firstValue = await axios.get('/selectAll')
      const newList = firstValue.data.map((list)=>list.todo)
      const newListDbIdx = firstValue.data.map((list)=>list.idx)
      const newCheckedList = firstValue.data.map((list)=>list.checked)
      // props.setTodoList(newList)
  }


  return (
    <>
      <div className='forAnimationDown' 
        ref={forAnimationRef}>
        <div className={'todoBox'+ (props.checkedList[props.index]?' checked':'')} 
        onClick={handleClickDone} ref={todoListRef}
        onDoubleClick={handleDoubleClick}
        >
          <span className='todos'>{props.todoList}</span>
        </div>
        <button className='deleteBtn' onClick={handleClickDelete}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    </>
  )
}
