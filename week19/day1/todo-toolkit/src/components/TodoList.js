import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos)

  return (
    <div className="todo-list">
      <h2>Your Todos ({todos.length})</h2>
      {todos.length === 0 ? (
        <p className="empty-message">No todos yet. Add one above!</p>
      ) : (
        <div className="todos-container">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoList