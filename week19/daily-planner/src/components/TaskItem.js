import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTask, deleteTask, editTask } from '../store/plannerSlice'

const TaskItem = ({ task, date }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description)

  const handleToggle = () => {
    dispatch(toggleTask({ date, taskId: task.id }))
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask({ date, taskId: task.id }))
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    dispatch(editTask({
      date,
      taskId: task.id,
      updatedTask: {
        title: editTitle,
        description: editDescription
      }
    }))
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setEditDescription(task.description)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="task-content">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="task-input"
            placeholder="Task title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="task-textarea"
            placeholder="Task description (optional)"
            rows="3"
          />
          <div className="form-buttons">
            <button onClick={handleSaveEdit} className="submit-btn">
              Save
            </button>
            <button onClick={handleCancelEdit} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

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
          Created: {new Date(task.createdAt).toLocaleString()}
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
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem