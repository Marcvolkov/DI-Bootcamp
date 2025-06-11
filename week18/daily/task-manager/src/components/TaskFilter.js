import React from 'react';
import { useTask } from '../context/TaskContext';

const TaskFilter = () => {
  const { filter, setFilter, tasks } = useTask();

  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  const filters = [
    { key: 'all', label: `All (${tasks.length})` },
    { key: 'active', label: `Active (${activeCount})` },
    { key: 'completed', label: `Completed (${completedCount})` }
  ];

  return (
    <div className="task-filter">
      <h3>Filter Tasks:</h3>
      <div className="filter-buttons">
        {filters.map(filterOption => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key)}
            className={`filter-btn ${filter === filterOption.key ? 'active' : ''}`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;