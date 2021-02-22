import React, { useState , useEffect } from "react";

export default function Todo(props) {
  const { todo , onEdit, onDelete, isEditing, setEditId} = props
  const [editText,setEditText] = useState(todo.title)
  const toggleTodo = (e)=> {
    onEdit({...todo,done:e.target.checked})
  }
  const onBlur = () => {
    setEditText(todo.title)
    setEditId(null)
  }
  const editTodo = (e) => {
    if (e.keyCode === 27) {
      e.target.blur()
      return
    }
    if (e.keyCode === 13) {
      if (e.target.value){
        onEdit({...todo,title:e.target.value})
        setEditText(e.target.value)
        setEditId(null)
      } else {
        onDelete(todo)
      }
    }
  }
  const wrapClassList = () =>{
    const base = 'todo-wrap'
    const completed = todo.done ? ' completed' : ''
    const edit = isEditing ? ' editing' : ''
    return base+completed+edit
  }
  const deleteTodo = () =>{
    const confirm = window.confirm('지우시겠습니까?')
    if (confirm){
      onDelete(todo)
    }
  }

  return (
    <li className="todo">
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
          <span className="delete" onClick={deleteTodo}>
            X
          </span>
        </div>
        <input
          value={editText}
          onChange={e=>setEditText(e.target.value)}
          type="text"
          className="edit"
          onKeyDown={editTodo}
          onBlur={onBlur}
        >
        </input>
      </div>
    </li>
  )
}