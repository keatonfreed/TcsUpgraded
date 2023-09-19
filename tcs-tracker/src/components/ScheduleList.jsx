import React from 'react'
import ScheduleEvent from './ScheduleEvent'
import './ScheduleList.css'
// import { v4 as uuidv4 } from 'uuid';
import * as dateFns from 'date-fns'

function ScheduleList({ schedule }) {
    schedule = schedule.reduce((allEvents, thisEvent) => {
        if (!allEvents.hasOwnProperty(thisEvent.Date)) {
            allEvents[thisEvent.Date] = []
        }
        allEvents[thisEvent.Date].push(thisEvent)
        return allEvents
    }, {})

    return (
        <div className='ScheduleList'>
            {Object.entries(schedule).map(([thisDate, dateEvents]) => {
                thisDate = dateFns.parse(thisDate, 'MM-dd-yyyy', 0)
                return (
                    <div className="ScheduleDay" key={thisDate}>
                        <h1>{dateFns.format(thisDate, 'EEEE M/dd')}</h1>
                        <ul className="EventList">
                            {dateEvents.map((event) => (
                                <ScheduleEvent key={event.Time + event.Student + event.Title} event={event}></ScheduleEvent>
                            ))}
                        </ul>
                    </div>
                )
            })}
            {!Object.entries(schedule).length && <h1>No Events to show.</h1>}
        </div>
    )
}

export default ScheduleList