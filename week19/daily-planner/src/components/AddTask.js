import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../store/plannerSlice'

const AddTask = () => {
  const dispatch = useDispatch()
  const selectedDate = useSelector(state => state.planner.selectedDate)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Please enter a task title')
      return
    }

    dispatch(addTask({
      date: selectedDate,
      task: {
        title: title.trim(),
        description: description.trim()
      }
    }))

    setTitle('')
    setDescription('')
    setShowForm(false)
  }

  const handleCancel = () => {
    setTitle('')
    setDescription('')
    setShowForm(false)
  }

  if (!showForm) {
    return (
      <div className="add-task-trigger">
        <button 
          onClick={() => setShowForm(true)} 
          className="add-task-btn"
        >
          + Add New Task
        </button>
      </div>
    )
  }

  return (
    <div className="task-form">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title *"
            className="task-input"
            required
          />
        </div>
        
        <div className="form-group">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description (optional)"
            className="task-textarea"
            rows="3"
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Add Task
          </button>
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTask