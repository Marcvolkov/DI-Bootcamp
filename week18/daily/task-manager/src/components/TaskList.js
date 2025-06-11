import React from 'react';
import { useTask } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { filteredTasks, filter } = useTask();

  if (filteredTasks.length === 0) {
    return (
      <div className="empty-state">
        <p>
          {filter === 'all' 
            ? 'No tasks yet. Add one above!' 
            : `No ${filter} tasks.`
          }
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;