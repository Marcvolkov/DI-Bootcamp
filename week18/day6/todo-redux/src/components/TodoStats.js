import React from 'react';
import { connect } from 'react-redux';

const TodoStats = ({ totalTodos, completedTodos, activeTodos }) => {
  return (
    <div className="todo-stats">
      <div className="stat-item">
        <span className="stat-number">{totalTodos}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{activeTodos}</span>
        <span className="stat-label">Active</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{completedTodos}</span>
        <span className="stat-label">Completed</span>
      </div>
    </div>
  );
};

// mapStateToProps to calculate statistics from state
const mapStateToProps = (state) => {
  const todos = state.todos;
  return {
    totalTodos: todos.length,
    completedTodos: todos.filter(todo => todo.completed).length,
    activeTodos: todos.filter(todo => !todo.completed).length
  };
};

export default connect(mapStateToProps)(TodoStats);