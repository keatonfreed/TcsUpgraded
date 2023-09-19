
import React, { useEffect, useState } from 'react'
import './DateRangeArea.css'
import DatePicker from './DatePicker'
import * as dateFns from 'date-fns';



function DateRangeArea({ setDateRange }) {
    const today = dateFns.startOfDay(new Date());
    const weekFromToday = dateFns.addDays(today, 7);

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(weekFromToday);

    useEffect(() => {
        setDateRange({ 'start': startDate, 'end': endDate })
    }, [startDate, endDate, setDateRange])

    // const handleButtonClick = () => {
    //     if (startDate && endDate) {
    //         console.log("Selected date range:", startDate, "TOOOO:", endDate);
    //     }
    // };

    return (
        <div className='DateRangeArea'>
            <DatePicker
                defaultDate={startDate}
                onDateSelect={date => setStartDate(date)}
            />
            <p>to</p>
            <DatePicker
                defaultDate={endDate}
                onDateSelect={date => setEndDate(date)}
            />
            {/* <button onClick={handleButtonClick}>Log Date Range</button> */}
        </div>
    )
}

export default DateRangeArea