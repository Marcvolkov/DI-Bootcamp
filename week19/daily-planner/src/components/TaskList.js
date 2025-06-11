import React from 'react'
import { useSelector } from 'react-redux'
import TaskItem from './TaskItem'

const TaskList = () => {
  const { selectedDate, tasks } = useSelector(state => state.planner)
  const dayTasks = tasks[selectedDate] || []
  
  const completedTasks = dayTasks.filter(task => task.completed)
  const pendingTasks = dayTasks.filter(task => !task.completed)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Tasks for {formatDate(selectedDate)}</h2>
        <div className="task-stats">
          <span className="stat">Total: {dayTasks.length}</span>
          <span className="stat">Pending: {pendingTasks.length}</span>
          <span className="stat">Completed: {completedTasks.length}</span>
        </div>
      </div>

      {dayTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks for this day. Add one to get started!</p>
        </div>
      ) : (
        <>
          {pendingTasks.length > 0 && (
            <div className="task-section">
              <h3>Pending Tasks ({pendingTasks.length})</h3>
              {pendingTasks.map(task => (
                <TaskItem key={task.id} task={task} date={selectedDate} />
              ))}
            </div>
          )}

          {completedTasks.length > 0 && (
            <div className="task-section">
              <h3>Completed Tasks ({completedTasks.length})</h3>
              {completedTasks.map(task => (
                <TaskItem key={task.id} task={task} date={selectedDate} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default TaskList