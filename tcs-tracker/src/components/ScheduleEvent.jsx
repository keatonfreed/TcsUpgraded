import React, { useState } from 'react'
import './ScheduleEvent.css'
import { format, parse } from 'date-fns';
import { Link } from 'react-router-dom'

const getTimeWithAMPM = (time) => {
    const [startTime, endTime] = time.split(' - ');
    const parseStartTime = parse(startTime, 'HH:mm', new Date());
    const parseEndTime = parse(endTime, 'HH:mm', new Date());
    const formattedStartTime = format(parseStartTime, 'h:mma').toLowerCase();
    const formattedEndTime = format(parseEndTime, 'h:mma').toLowerCase();
    return `${formattedStartTime} - ${formattedEndTime}`;
};

function ScheduleEvent({ event }) {
    let [notes, setNotes] = useState("")
    let [opened, setOpened] = useState(false)
    function openToggle(event) {
        let check = event.target.className.includes('ScheduleEvent') || !event.target.className.includes('eventClickable')
        if (check) {
            setOpened(!opened)
        }
    }
    return (
        <li className={`eventHeightControl ${opened ? 'opened' : ''}`}>
            {opened ? (
                <div className={`ScheduleEvent ${event.Completed ? 'completed' : ''} ${opened ? 'opened' : ''}`}>
                    <div className="top">
                        <p className='eventTime'>{getTimeWithAMPM(event.Time)}</p>
                        <p className='eventTitle'>{event.Title}</p>
                    </div>

                    <div className="middle">
                        <div className="students">
                            {event.Student.map(student => (
                                <Link to={`/students/${student}`} className='eventStudent eventClickable' key={student} >{student}</Link>
                            ))}
                        </div>
                        <p className='eventCoach'>{`Coach${event.Coach.length > 1 ? 'es' : ''}: ${event.Coach.join(', ')}`}</p>
                    </div>
                    <div className="bottom">
                        <p className='eventNotesLabel'>Notes</p>
                        <textarea className='eventNotes' placeholder="Notes here..." value={notes} onChange={(e) => { setNotes(e.target.value) }}></textarea>
                        <div className="eventNotesControls">
                            <div className="eventNotesFormatting">
                                <button>Bold</button><button>Italics</button><button>Underline</button>
                            </div>
                            <button>Submit Notes</button>
                        </div>
                    </div>
                    <button onClick={openToggle} className='eventClose'><img src="/closeIcon.svg" alt="Close" className='svgTheme' /></button>
                </div>
            ) : (
                <button onClick={openToggle} className={`ScheduleEvent ${event.Completed ? 'completed' : ''} ${opened ? 'opened' : ''}`}>
                    <p className='eventTime'>{getTimeWithAMPM(event.Time)}</p>
                    <p className='eventStudent'>{event.Student.length > 1 ? `${event.Student.length} Students` : event.Student}</p>

                    <p className='eventTitle'>{event.Title}</p>
                </button>
            )}
        </li>
    )
}

export default ScheduleEvent