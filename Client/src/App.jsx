import './App.css'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import AdminLogin from './Pages/AdminLogin'
import StudentLogin from './Pages/StudentLogin'
import ResetPassword from './Pages/ResetPassword'
import UpdatePassword from './Pages/UpdatePassword'
import VerifyOtp from './Pages/VerifyOtp'
import AdminDashboard from './Pages/AdminDashboard'
import StudentDashboard from './Pages/StudentDashboard'
import StudentRegister from './Pages/StudentRegister'
const App = () => {
  return (
    <Router>
        <Routes >
          <Route path='/' element={<LandingPage/>} />
          <Route path='/admin' element={<AdminLogin/>} />
          <Route path='/student' element={<StudentLogin/>} />
          <Route path='/forgot-password' element={<ResetPassword/>} />
          <Route path='/Update-password' element={<UpdatePassword/>} />
          <Route path='/Verify-otp' element={<VerifyOtp/>} />
          <Route path='/admin-Dashboard' element={<AdminDashboard/>} />
          <Route path='/student-Dashboard' element={<StudentDashboard/>} />
          <Route path='/student-register' element={<StudentRegister/>} />
        </Routes >
    </Router>
  )
}

export default App