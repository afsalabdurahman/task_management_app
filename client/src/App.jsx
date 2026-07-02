import { useState } from 'react'
import {  Dashboard} from './pages/Dashboard'
import './App.css'
import { TaskForm } from './components/TaskForm'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/Login'
import { LandingPage } from './pages/Landing'
import { SignupPage } from './pages/Signup'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<TaskForm />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/login" element={<LoginPage />} />
         <Route path="/signup" element={<SignupPage />} />
      </Routes>
   
  
  {/* <TaskForm/> */}
  
    </>
  )
}

export default App
