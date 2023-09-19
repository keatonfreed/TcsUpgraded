import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import ScheduleList from './ScheduleList'
import DateRangeArea from './DateRangeArea';
import * as dateFns from 'date-fns'

export default function Dashboard() {
    let [schedule, setSchedule] = useState([])
    let [visibleSchedule, setVisibleSchedule] = useState([])
    let [dateRange, setDateRange] = useState({ 'start': null, 'end': null })

    useEffect(() => {
        fetch('/schedule.json').then((json) => json.json()).then(scheduleData => {
            setSchedule(scheduleData)
        }).catch((error) => { console.warn("NO SCHEDULE DATA FOUND") })
    }, [])

    useEffect(() => {
        let comparingDateRange = { ...dateRange }
        if (dateFns.differenceInDays(comparingDateRange.end, comparingDateRange.start) < 0) {
            comparingDateRange.start = dateRange.end
            comparingDateRange.end = dateRange.start
        }
        setVisibleSchedule(schedule.filter(scheduleItem => {
            let comparingDate = dateFns.parse(scheduleItem.Date, 'MM-dd-yyyy', 0)
            // console.log("log", scheduleItem, comparingDate)
            return (dateFns.differenceInDays(comparingDateRange.end, comparingDate) >= 0 && dateFns.differenceInDays(comparingDateRange.start, comparingDate) <= 0)
        }))
    }, [schedule, dateRange])

    return (
        <div className='Dashboard'>
            <DateRangeArea setDateRange={setDateRange}></DateRangeArea>
            <ScheduleList schedule={visibleSchedule}></ScheduleList>
        </div>
    )
}
