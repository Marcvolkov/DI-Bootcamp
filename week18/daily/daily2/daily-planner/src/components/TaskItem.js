import React from 'react';
import { connect } from 'react-redux';
import { toggleTask, deleteTask } from '../redux/actions';

const TaskItem = ({ task, selectedDate, toggleTask, deleteTask, onEdit }) => {
  const handleToggle = () => {
    toggleTask(selectedDate, task.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(selectedDate, task.id);
    }
  };

  const handleEdit = () => {
    onEdit(task);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="task-checkbox"
          />
          <h4 className="task-title">{task.title}</h4>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-meta">
          <span className="created-at">
            Created: {new Date(task.createdAt).toLocaleTimeString()}
          </span>
        </div>
      </div>
      
      <div className="task-actions">
        <button
          onClick={handleEdit}
          className="edit-btn"
          disabled={task.completed}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedDate: state.selectedDate
});

const mapDispatchToProps = {
  toggleTask,
  deleteTask
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);