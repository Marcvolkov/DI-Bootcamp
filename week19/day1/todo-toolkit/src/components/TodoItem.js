import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, removeTodo } from '../features/todos/todoSlice'

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id))
  }

  const handleRemove = () => {
    dispatch(removeTodo(todo.id))
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox"
        />
        <span className="todo-text">{todo.text}</span>
      </div>
      <button onClick={handleRemove} className="remove-btn">
        Delete
      </button>
    </div>
  )
}

export default TodoItem