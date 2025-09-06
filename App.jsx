import './App.css'
import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router';
import Login from './pages/Login';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Session from './pages/admin/Session';
import Subject from './pages/admin/Subject';
import Examination from './pages/admin/Examination';
import QuestionBank from './pages/admin/QuestionBank';
import Registration from './pages/Registration';
import UserDashboard from './pages/user/UserDashboard';
import Myexams from './pages/user/Myexams';
import Myresult from './pages/user/Myresult';
import Getexams from './pages/user/Getexams';
import DashboardHome from './pages/user/DashboardHome';
import Message from './pages/user/Message';
import ChangePassword from './pages/user/ChangePassword';
import Examinee from './pages/admin/Examinee';
import ReportGeneration from './pages/admin/ReportGeneration';
import AdminChangepassword from './pages/admin/AdminChangepassword';
import MessageReply from './pages/admin/MessageReply';
import AdminHome from './pages/admin/AdminHome';
function App() {

  return (
    <>
      <Router>
        <Routes>
         <Route path='/' element={<Login/>}></Route> 
         <Route path='/register' element={<Registration/>}></Route>
          <Route path='/adlogin' element={<AdminLogin/>}></Route>
          {/* admin routes start */}
        <Route path='/adminDashboard' element={<Dashboard/>}>
    <Route index element={<AdminHome/>}></Route>
          <Route path='session' element={<Session/>}></Route>
          <Route path='subject' element={<Subject/>}></Route>
          <Route path='examination' element={<Examination/>}></Route>
          <Route path='question' element={<QuestionBank/>}></Route>
          <Route path='examinee' element={<Examinee/>}></Route>
          <Route path='reportGeneration' element={<ReportGeneration/>}></Route>
          <Route path='changepassword' element={<AdminChangepassword/>}></Route>
          <Route path='messageReply' element={<MessageReply/>}></Route>
        </Route>
          {/* admin routes end */}

          {/* user router start */}
  <Route path='/userDashboard' element={<UserDashboard/>}>
  <Route index element={<DashboardHome/>}></Route>
            <Route path='myexams' element={<Myexams/>}></Route>
            <Route path='myresult' element={<Myresult/>}></Route>
            <Route path='getexam/:id' element={<Getexams/>}></Route>
            <Route path='message' element={<Message/>}></Route>
            <Route path='changepassword' element={<ChangePassword/>}></Route>
        </Route>
          {/* user router end */}
        </Routes>
      </Router>
    </>
  )
}

export default App
