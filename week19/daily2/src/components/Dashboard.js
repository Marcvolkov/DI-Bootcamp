import React from 'react'
import { useSelector } from 'react-redux'
import { 
  selectCompletedTasks, 
  selectTotalTasks, 
  selectCompletionPercentage,
  selectOverdueTasks,
  selectTasksByPriority 
} from '../store/selectors'

const Dashboard = () => {
  const completedTasks = useSelector(selectCompletedTasks)
  const totalTasks = useSelector(selectTotalTasks)
  const completionPercentage = useSelector(selectCompletionPercentage)
  const overdueTasks = useSelector(selectOverdueTasks)
  const tasksByPriority = useSelector(selectTasksByPriority)

  return (
    <div className="dashboard">
      <h2>Productivity Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{completedTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{totalTasks - completedTasks}</div>
          <div className="stat-label">Pending</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{completionPercentage}%</div>
          <div className="stat-label">Progress</div>
        </div>
      </div>

      <div className="progress-section">
        <h3>Overall Progress</h3>
        <div className="progress-bar-large">
          <div 
            className="progress-fill-large"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p>{completedTasks} of {totalTasks} tasks completed</p>
      </div>

      <div className="alerts-section">
        {overdueTasks.length > 0 && (
          <div className="alert alert-warning">
            <h4>⚠️ Overdue Tasks ({overdueTasks.length})</h4>
            <ul>
              {overdueTasks.slice(0, 3).map(task => (
                <li key={task.id}>{task.title}</li>
              ))}
              {overdueTasks.length > 3 && (
                <li>...and {overdueTasks.length - 3} more</li>
              )}
            </ul>
          </div>
        )}

        <div className="priority-breakdown">
          <h3>Tasks by Priority</h3>
          <div className="priority-stats">
            <div className="priority-item high">
              <span className="priority-dot"></span>
              High: {tasksByPriority.high.length} tasks
            </div>
            <div className="priority-item medium">
              <span className="priority-dot"></span>
              Medium: {tasksByPriority.medium.length} tasks
            </div>
            <div className="priority-item low">
              <span className="priority-dot"></span>
              Low: {tasksByPriority.low.length} tasks
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard