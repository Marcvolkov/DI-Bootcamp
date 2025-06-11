import React from 'react';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

// mapStateToProps to connect state to props
const mapStateToProps = (state) => ({
  todos: state.todos
});

export default connect(mapStateToProps)(TodoList);