import React from 'react';
import { connect } from 'react-redux';
import { setSelectedDate } from '../redux/actions';

const DatePicker = ({ selectedDate, setSelectedDate, tasksByDate }) => {
  // Get dates for the past 7 days and next 7 days
  const getDatesRange = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = -7; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      const isToday = i === 0;
      const taskCount = tasksByDate[dateString] ? tasksByDate[dateString].length : 0;
      
      dates.push({
        dateString,
        dayName,
        dayNumber,
        isToday,
        taskCount
      });
    }
    
    return dates;
  };

  const handleDateSelect = (dateString) => {
    setSelectedDate(dateString);
  };

  const dates = getDatesRange();

  return (
    <div className="date-picker">
      <h3>Select Date</h3>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => handleDateSelect(e.target.value)}
        className="date-input"
      />
      
      <div className="date-cards">
        {dates.map(({ dateString, dayName, dayNumber, isToday, taskCount }) => (
          <div
            key={dateString}
            className={`date-card ${selectedDate === dateString ? 'selected' : ''} ${isToday ? 'today' : ''}`}
            onClick={() => handleDateSelect(dateString)}
          >
            <div className="day-name">{dayName}</div>
            <div className="day-number">{dayNumber}</div>
            {taskCount > 0 && (
              <div className="task-count">{taskCount}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedDate: state.selectedDate,
  tasksByDate: state.tasksByDate
});

const mapDispatchToProps = {
  setSelectedDate
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);