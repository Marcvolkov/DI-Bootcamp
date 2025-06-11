import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCategories, selectCategoryStats, selectSelectedCategoryId } from '../store/selectors'
import { setSelectedCategory } from '../store/tasksSlice'

const CategorySelector = () => {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const categoryStats = useSelector(selectCategoryStats)
  const selectedCategoryId = useSelector(selectSelectedCategoryId)

  // Optimized category selection handler
  const handleCategorySelect = useCallback((categoryId) => {
    dispatch(setSelectedCategory(categoryId))
  }, [dispatch])

  const handleShowAll = useCallback(() => {
    dispatch(setSelectedCategory(null))
  }, [dispatch])

  return (
    <div className="category-selector">
      <h3>Categories</h3>
      
      <div className="category-list">
        <button
          className={`category-item ${selectedCategoryId === null ? 'selected' : ''}`}
          onClick={handleShowAll}
        >
          <div className="category-info">
            <div className="category-header">
              <span className="category-name">All Tasks</span>
            </div>
            <div className="category-stats">
              <span>View all tasks</span>
            </div>
          </div>
        </button>

        {categoryStats.map(category => (
          <button
            key={category.id}
            className={`category-item ${selectedCategoryId === category.id ? 'selected' : ''}`}
            onClick={() => handleCategorySelect(category.id)}
          >
            <div className="category-info">
              <div className="category-header">
                <div 
                  className="category-color" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="category-name">{category.name}</span>
                <span className="task-count">{category.totalTasks}</span>
              </div>
              
              <div className="category-stats">
                <span className="completion-rate">
                  {category.completionRate}% complete
                </span>
                <span className="task-breakdown">
                  {category.completedTasks}/{category.totalTasks} tasks
                </span>
              </div>
              
              {category.totalTasks > 0 && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${category.completionRate}%`,
                      backgroundColor: category.color 
                    }}
                  ></div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategorySelector