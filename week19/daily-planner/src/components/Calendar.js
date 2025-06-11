import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedDate } from '../store/plannerSlice'

const Calendar = () => {
  const dispatch = useDispatch()
  const { selectedDate, tasks } = useSelector(state => state.planner)

  const generateDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = -7; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    
    return dates
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const handleDateSelect = (date) => {
    dispatch(setSelectedDate(formatDate(date)))
  }

  const getTaskCount = (dateStr) => {
    return tasks[dateStr] ? tasks[dateStr].length : 0
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  return (
    <div className="calendar">
      <h3>Select Date</h3>
      <div className="date-picker">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => dispatch(setSelectedDate(e.target.value))}
          className="date-input"
        />
      </div>
      
      <div className="date-cards">
        {generateDates().map((date, index) => {
          const dateStr = formatDate(date)
          const taskCount = getTaskCount(dateStr)
          
          return (
            <div
              key={index}
              className={`date-card ${selectedDate === dateStr ? 'selected' : ''} ${isToday(date) ? 'today' : ''}`}
              onClick={() => handleDateSelect(date)}
            >
              <div className="day-name">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="day-number">
                {date.getDate()}
              </div>
              {taskCount > 0 && (
                <div className="task-count">{taskCount}</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar