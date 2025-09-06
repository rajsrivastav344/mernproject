import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';


const UserDashboard = () => {

  const [collapsed, setCollapsed] = useState(false);

  const role = localStorage.getItem('userRole')
  if (role == "user") {
    var email = localStorage.getItem('userEmail')
  } 
  else {
    window.location.href = '/'
  }
 const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };
   const handlelogout = ()=>{
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userId')
    window.location.href='/'
   }

  return (
 <div className={`dashboard-container ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar">
  <div className="sidebar-header p-2 border-b-2 " style={{borderBottom:'2px solid #bf9debff'}}>
          <h4>ExamPrep</h4>
        </div>
        <ul className="nav-links p-2">
          <li><i class="fa-solid fa-chart-bar"></i> 
          <Link to="myexams" className='text-white text-decoration-none'>My Exams</Link>
          </li>
          <li> <i class="fa-solid fa-book-open"></i> <Link to="myresult" className='text-white text-decoration-none'>My Results</Link></li>
          <li> <i className="fa-solid fa-user"></i><Link to="changepassword" className='text-white text-decoration-none'> Change Password</Link></li>
         
          
          
           <li><i class="fa-solid fa-message"></i> <Link to="message" className='text-white text-decoration-none'>Message</Link></li>
          <li><i class="fa-solid fa-arrow-right-from-bracket"></i> <Link className='text-decoration-none text-white' 
    onClick={()=>{handlelogout()}}>Log Out</Link></li>
        </ul>
      </div>

      <div className="main">
        <div className="topbar d-flex justify-content-between align-items-center p-3 border-bottom border-success bg-dark">
          <h4 className="text-white mb-0">
                        {getGreeting()} <i className="fa-solid fa-user-tie ms-2"></i>
                    </h4>
          <h2>Admin Dashboard</h2>
        </div>
          
        <div className="content">
          <Outlet />
         
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;