import React, { useRef } from 'react';
import { useTask } from '../context/TaskContext';

const TaskForm = () => {
  const inputRef = useRef(null);
  const { addTask } = useTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputRef.current.value;
    addTask(text);
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a new task..."
        className="task-input"
        autoFocus
      />
      <button type="submit" className="add-btn">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;