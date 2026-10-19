import {  Dashboard} from './pages/Dashboard'
import './App.css'
import { TaskForm } from './components/TaskForm'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/Login'
import { LandingPage } from './pages/Landing'
import { SignupPage } from './pages/Signup'
import { ProtectedRoutes } from './components/protectedRoutes/ProtectedRoutes'
import { PublicRoute } from './components/protectedRoutes/PublicRoutres'
function App() {
 

  return (
    
      <Routes>
        <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
     
       
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/login" element={<LoginPage />} />
         <Route path="/signup" element={<SignupPage />} />
      </Route>
        {/* Protected Routes */}
  <Route element={<ProtectedRoutes />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/form" element={<TaskForm />} />
  </Route>
   </Routes>
  
    
  )
}

export default App
