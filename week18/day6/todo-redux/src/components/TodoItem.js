import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo, removeTodo } from '../redux/actions';

const TodoItem = ({ todo, toggleTodo, removeTodo }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
      />
      <span className="todo-text">{todo.text}</span>
      <button
        onClick={() => removeTodo(todo.id)}
        className="remove-btn"
      >
        Remove
      </button>
    </div>
  );
};

// mapDispatchToProps to connect action creators
const mapDispatchToProps = {
  toggleTodo,
  removeTodo
};

export default connect(null, mapDispatchToProps)(TodoItem);