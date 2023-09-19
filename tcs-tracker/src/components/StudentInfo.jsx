import React from 'react'
import './StudentInfo.css'
import { useParams } from 'react-router-dom'

function StudentInfo() {
    let { id: studentId } = useParams()
    return (
        <div>StudentInfo {studentId}</div>
    )
}

export default StudentInfo 