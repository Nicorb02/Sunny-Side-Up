import React, { useState } from 'react'
import CalendarCom from '../components/CalendarCom'
import '../styles/SideBar.css'
import DayForm from '../components/DayForm'

const PlannerPage = () => {
    const [date, setDate] = useState(new Date());

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    return (
        <div className='page'>
            <DayForm date={date} setDate={setDate} />
            <CalendarCom date={date} setDate={setDate}/>
        </div>
    )
}

export default PlannerPage;