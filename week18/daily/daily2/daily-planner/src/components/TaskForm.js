import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTask, editTask } from '../redux/actions';

const TaskForm = ({ selectedDate, addTask, editTask, editingTask, onCancel }) => {
  const [title, setTitle] = useState(editingTask ? editingTask.title : '');
  const [description, setDescription] = useState(editingTask ? editingTask.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    if (editingTask) {
      editTask(selectedDate, editingTask.id, { title: title.trim(), description: description.trim() });
      onCancel();
    } else {
      addTask(selectedDate, title.trim(), description.trim());
    }

    setTitle('');
    setDescription('');
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
      
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
          className="task-input"
          required
        />
      </div>
      
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)..."
          className="task-textarea"
          rows="3"
        />
      </div>
      
      <div className="form-buttons">
        <button type="submit" className="submit-btn">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  selectedDate: state.selectedDate
});

const mapDispatchToProps = {
  addTask,
  editTask
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);