import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions';

const TodoForm = ({ addTodo }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      addTodo(inputText.trim());
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
      />
      <button type="submit" className="add-btn">
        Add Todo
      </button>
    </form>
  );
};

// mapDispatchToProps to connect action creators
const mapDispatchToProps = {
  addTodo
};

export default connect(null, mapDispatchToProps)(TodoForm);