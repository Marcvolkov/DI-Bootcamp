import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectCategoryById } from '../store/selectors'

const TaskItem = ({ 
  task, 
  onToggleCompletion, 
  onUpdateProgress, 
  onEditTask, 
  onDeleteTask 
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description)
  const [editPriority, setEditPriority] = useState(task.priority)
  const [editDueDate, setEditDueDate] = useState(task.dueDate)

  const category = useSelector(state => selectCategoryById(state, task.categoryId))

  // Optimized handlers with useCallback
  const handleToggle = useCallback(() => {
    onToggleCompletion(task.id)
  }, [onToggleCompletion, task.id])

  const handleProgressChange = useCallback((e) => {
    const progress = parseInt(e.target.value)
    onUpdateProgress(task.id, progress)
  }, [onUpdateProgress, task.id])

  const handleEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleSaveEdit = useCallback(() => {
    onEditTask(task.id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      dueDate: editDueDate
    })
    setIsEditing(false)
  }, [onEditTask, task.id, editTitle, editDescription, editPriority, editDueDate])

  const handleCancelEdit = useCallback(() => {
    setEditTitle(task.title)
    setEditDescription(task.description)
    setEditPriority(task.priority)
    setEditDueDate(task.dueDate)
    setIsEditing(false)
  }, [task.title, task.description, task.priority, task.dueDate])

  const handleDelete = useCallback(() => {
    onDeleteTask(task.id)
  }, [onDeleteTask, task.id])

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c'
      case 'medium': return '#f39c12'
      case 'low': return '#27ae60'
      default: return '#95a5a6'
    }
  }

  const isOverdue = task.dueDate && task.dueDate < new Date().toISOString().split('T')[0] && !task.completed

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
            placeholder="Task description"
            rows="2"
          />
          <div className="task-form-row">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="task-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="task-input"
            />
          </div>
          <div className="form-buttons">
            <button onClick={handleSaveEdit} className="save-btn">
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
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="task-checkbox"
          />
          <div className="task-title-section">
            <h4 className="task-title">{task.title}</h4>
            <div className="task-badges">
              {category && (
                <span 
                  className="category-badge"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </span>
              )}
              <span 
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              >
                {task.priority}
              </span>
              {isOverdue && (
                <span className="overdue-badge">Overdue</span>
              )}
            </div>
          </div>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-progress">
          <label>Progress: {task.progress}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={task.progress}
            onChange={handleProgressChange}
            className="progress-slider"
            disabled={task.completed}
          />
        </div>

        <div className="task-meta">
          {task.dueDate && (
            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          )}
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