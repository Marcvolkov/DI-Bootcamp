import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCategories } from '../store/selectors'
import { addTask } from '../store/tasksSlice'

const AddTaskForm = () => {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    
    if (!title.trim() || !categoryId) {
      alert('Please fill in the title and select a category')
      return
    }

    dispatch(addTask({
      title: title.trim(),
      description: description.trim(),
      categoryId: parseInt(categoryId),
      priority,
      dueDate
    }))

    // Reset form
    setTitle('')
    setDescription('')
    setCategoryId('')
    setPriority('medium')
    setDueDate('')
    setIsOpen(false)
  }, [dispatch, title, description, categoryId, priority, dueDate])

  const handleCancel = useCallback(() => {
    setTitle('')
    setDescription('')
    setCategoryId('')
    setPriority('medium')
    setDueDate('')
    setIsOpen(false)
  }, [])

  if (!isOpen) {
    return (
      <div className="add-task-trigger">
        <button 
          onClick={() => setIsOpen(true)} 
          className="add-task-btn"
        >
          + Add New Task
        </button>
      </div>
    )
  }

  return (
    <div className="add-task-form">
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
        
        <div className="form-row">
          <div className="form-group">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="task-select"
              required
            >
              <option value="">Select Category *</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="task-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="task-input"
            placeholder="Due date (optional)"
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

export default AddTaskForm