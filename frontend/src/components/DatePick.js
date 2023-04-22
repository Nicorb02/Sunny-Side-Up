import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import '../styles/DatePick.css';
import '../styles/Calendar.css';


const DatePick = ({ date }) =>  {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <DateTimePicker 
      onChange={onChange} 
      value={date}
      disableClock='true'
      format='h:mm a'
      disableCalendar='true'
      maxDetail='hour'
      />
    </div>
  );
}

export default DatePick;