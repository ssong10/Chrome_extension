import React, { useState, useEffect } from "react";
import { setStorage, getStorage } from './util'
import Todo from './todo'
export default function TodoList() {
  const [todos,setTodos] = useState(getStorage('TODOS') || [])
  const [editId, setEditId] = useState(null)
  const [type,setType] = useState(0)
  const [dragItem, setDragItem] = useState(null)
  useEffect(()=> {
    setStorage('TODOS',todos)
  },[todos])
  const shownTodos = () => {
    return todos.filter(todo => {
      switch (type) {
        case 1:
          return !todo.done;
        case 2:
          return todo.done;
        default:
          return true;
      }
    })
  }
  const addTodo =(e)=>{
    if (e.keyCode == 13 && e.target.value){
      const newTodo = {
        id : Date.now(),
        title:e.target.value,
        done: false,
      }
      e.target.value = ''
      setTodos([...todos,newTodo])
    }
  }
  const changeTodo = (id,editTodo) => {
    setTodos(todos.map(todo => {
      if (todo.id===id) {
        return editTodo
      } else {
        return todo
      }
    }))
  }
  const deleteTodo = (target) => {
    setTodos(todos.filter((todo,i)=> {
        return todo !== target
      })
    )
  }
  const onDragEvent = (e) => {
    e.preventDefault()
  }
  const startDrag = (e) => {
    setDragItem(e.target)
  }
  const moveIndex = (from,to) => {
    const todoList = todos
    const a = todoList.filter((_,idx) => {
      if (idx !== from & idx <= to) {
        return true
      }
    })
    const b = todoList.filter((_,idx)=> {
      if (idx !== from & idx > to) {
        return true
      }
    })
    setTodos(a.concat(todoList[from],b))
  }
  const dropEvent = (e) =>{
    const todo = e.target.closest('.todo')
    const todoNodes = Array.from(dragItem.parentNode.childNodes)
    const to = todoNodes.indexOf(todo)
    const from = todoNodes.indexOf(dragItem)
    moveIndex(from,to)
  }
  return (
    <div className="todo-list">
      <input className="new-todo" onKeyDown={addTodo} type="text"></input>
      <ul className="todos" onDragStart={startDrag} onDrop={dropEvent} onDragOver={onDragEvent}>
        {shownTodos().map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onEdit={newTodo => changeTodo(todo.id,newTodo)}
            onDelete={deleteTodo}
            isEditing={todo.id === editId}
            setEditId={setEditId}
          ></Todo>
        ))}
      </ul>
      <div className="buttons">
        <button onClick={()=>setType(0)} className={type===0 ? 'select' : ''}>할 일</button>
        <button onClick={()=>setType(1)} className={type===1 ? 'select' : ''}>진행중</button>
        <button onClick={()=>setType(2)} className={type===2 ? 'select' : ''}>완료</button>
      </div>
    </div>
  )
}