import React, { useState } from "react";

export default function Todo(props) {
  const { todo , onEdit, isEditing, setEditId} = props

  const toggleTodo = (e)=> {
    onEdit({...todo,done:e.target.checked})
  }
  const editTodo = () => {
    setEditId(todo.id)
  }
  const wrapClassList = () =>{
    const base = 'todo-wrap'
    const completed = todo.done ? ' completed' : ''
    const edit = isEditing ? ' editing' : ''
    return base+completed+edit
  }
  return (
    <div className={wrapClassList()}>
      <div className="content">
        <input
          className="checked"
          type="checkbox"
          checked={todo.done ? true:false}
          onChange={toggleTodo}
        />
        <label
          onDoubleClick={()=>setEditId(todo.id)}
        >
          {todo.title}
        </label>
        <span className="delete">X</span>
      </div>
      <input defaultValue={todo.title} type="text" className="edit">
      </input>
    </div>
  )
}