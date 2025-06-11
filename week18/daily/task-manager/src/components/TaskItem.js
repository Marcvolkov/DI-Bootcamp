import React, { useState, useRef, useEffect } from 'react';
import { useTask } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef(null);
  const { toggleTask, deleteTask, editTask } = useTask();

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const newText = editInputRef.current.value;
    editTask(task.id, newText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="task-checkbox"
      />
      
      {isEditing ? (
        <div className="edit-container">
          <input
            ref={editInputRef}
            type="text"
            defaultValue={task.text}
            className="edit-input"
            onKeyDown={handleKeyPress}
            onBlur={handleCancel}
          />
          <div className="edit-buttons">
            <button onClick={handleSave} className="save-btn">
              ✓
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              ✕
            </button>
          </div>
        </div>
      ) : (
        <div className="task-content">
          <span 
            className="task-text"
            onClick={() => !task.completed && handleEdit()}
          >
            {task.text}
          </span>
          <div className="task-buttons">
            <button 
              onClick={handleEdit} 
              className="edit-btn"
              disabled={task.completed}
            >
              Edit
            </button>
            <button 
              onClick={() => deleteTask(task.id)} 
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;