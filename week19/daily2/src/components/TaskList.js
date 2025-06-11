import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectTasksInSelectedCategory, selectSelectedCategoryId } from '../store/selectors'
import { toggleTaskCompletion, updateTaskProgress, editTask, deleteTask } from '../store/tasksSlice'
import TaskItem from './TaskItem'

const TaskList = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(selectTasksInSelectedCategory)
  const selectedCategoryId = useSelector(selectSelectedCategoryId)

  // Optimized callback handlers using useCallback
  const handleToggleCompletion = useCallback((taskId) => {
    dispatch(toggleTaskCompletion(taskId))
  }, [dispatch])

  const handleUpdateProgress = useCallback((taskId, progress) => {
    dispatch(updateTaskProgress({ id: taskId, progress }))
  }, [dispatch])

  const handleEditTask = useCallback((taskId, updates) => {
    dispatch(editTask({ id: taskId, updates }))
  }, [dispatch])

  const handleDeleteTask = useCallback((taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId))
    }
  }, [dispatch])

  const completedTasks = tasks.filter(task => task.completed)
  const pendingTasks = tasks.filter(task => !task.completed)

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>
          {selectedCategoryId ? 'Category Tasks' : 'All Tasks'} ({tasks.length})
        </h2>
        {tasks.length > 0 && (
          <div className="task-stats">
            <span className="stat">
              Completed: {completedTasks.length}
            </span>
            <span className="stat">
              Pending: {pendingTasks.length}
            </span>
            <span className="stat">
              Progress: {Math.round((completedTasks.length / tasks.length) * 100)}%
            </span>
          </div>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>
            {selectedCategoryId 
              ? 'No tasks in this category. Add some tasks to get started!' 
              : 'No tasks available. Create your first task!'}
          </p>
        </div>
      ) : (
        <>
          {pendingTasks.length > 0 && (
            <div className="task-section">
              <h3>Pending Tasks ({pendingTasks.length})</h3>
              <div className="tasks-container">
                {pendingTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleCompletion={handleToggleCompletion}
                    onUpdateProgress={handleUpdateProgress}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                  />
                ))}
              </div>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div className="task-section">
              <h3>Completed Tasks ({completedTasks.length})</h3>
              <div className="tasks-container">
                {completedTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleCompletion={handleToggleCompletion}
                    onUpdateProgress={handleUpdateProgress}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default TaskList