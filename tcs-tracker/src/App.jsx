import './App.css';
import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Students from './components/Students'
import StudentInfo from './components/StudentInfo'


function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);


  // Toggle the mode when the button is clicked
  const toggleMode = () => {
    setDarkMode(oldMode => !oldMode);
  }

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} ></Header>
      <Routes>
        <Route exact path="/" element={<Navigate to="/dashboard" replace={true} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<StudentInfo />} />
      </Routes>
    </div>
  );
}

export default App;
