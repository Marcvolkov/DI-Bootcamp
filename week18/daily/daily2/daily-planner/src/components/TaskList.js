import React, { useState } from 'react';
import { connect } from 'react-redux';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = ({ selectedDate, tasks }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const completedTasks = tasks.filter(task => task.completed);
  const activeTasks = tasks.filter(task => !task.completed);

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Tasks for {formatDate(selectedDate)}</h2>
        <div className="task-stats">
          <span className="stat">Total: {tasks.length}</span>
          <span className="stat">Active: {activeTasks.length}</span>
          <span className="stat">Completed: {completedTasks.length}</span>
        </div>
      </div>

      {editingTask ? (
        <TaskForm
          editingTask={editingTask}
          onCancel={handleCancelEdit}
        />
      ) : (
        <TaskForm />
      )}

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks for this day. Add your first task above!</p>
        </div>
      ) : (
        <div className="tasks">
          {activeTasks.length > 0 && (
            <div className="task-section">
              <h3>Active Tasks ({activeTasks.length})</h3>
              {activeTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                />
              ))}
            </div>
          )}

          {completedTasks.length > 0 && (
            <div className="task-section">
              <h3>Completed Tasks ({completedTasks.length})</h3>
              {completedTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedDate: state.selectedDate,
  tasks: state.tasksByDate[state.selectedDate] || []
});

export default connect(mapStateToProps)(TaskList);