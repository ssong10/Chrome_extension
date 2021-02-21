import React, { useState, useEffect } from "react";
import {setStorage,getStorage} from './util'
import Todo from './todo'
export default function TodoList() {
  const [todos,setTodos] = useState(getStorage('TODOS') || [])
  const [editId, setEditId] = useState(null)
  useEffect(()=>{
    console.log(editId)
  },[editId])
  const addTodo =(e)=>{
    if (e.keyCode == 13){
      const newTodo = {
        id : Date.now(),
        title:e.target.value,
        done: false,
      }
      setTodos([...todos,newTodo])
    }
  }
  const changeTodo = (id,editTodo) => {
    setTodos(todos.map(todo => {
      if (todo.id===id) {
        console.log(editTodo)
        return editTodo
      } else {
        return todo
      }
    }))
  }
  return (
    <div className="todo-list">
      <input className="new-todo" onKeyDown={addTodo} type="text"></input>
      <ul className="todos">
        {todos.map((todo,idx) => (
          <Todo
            key={`todo_${idx}`}
            todo={todo}
            onEdit={newTodo => changeTodo(todo.id,newTodo)}
            isEditing={todo.id === editId}
            setEditId={setEditId}
          ></Todo>
        ))}
      </ul>
      <div className="buttons">
        <button className="all">할 일</button>
        <button className="active">진행중</button>
        <button className="complete">완료</button>
      </div>
    </div>
  )
}