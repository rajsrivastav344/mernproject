import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router'
const Login = () => {
  const [form , setform] = useState({
    email:'',
    password:''
  });
  const handleChange = (e)=>{
    setform({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
        const res = await axios.post('http://localhost:5000/api/examinee/login',form)
        if(res.data.message=="Login Successfully"){
          localStorage.setItem("userEmail",res.data.user.email)
          localStorage.setItem("userId",res.data.user.id)
          localStorage.setItem("userRole",res.data.user.role);
          window.location.href='/userDashboard'
        }
      }catch(er){
        console.log(er)
        alert("Sorry Try Again")
      }
  }
  return (
    <>
    <div className="container-fluid">
      <div className="row my-5">
       
        <div className="col-sm-10 mx-auto py-5">
          <div className="card">
             <h1>User Login form</h1>
            <div className="card-body">
              <form method='POST' onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-8 mx-auto">
                    <input type="email" placeholder='Enter Email'  name='email' 
                    onChange={handleChange}
                    className='form-control'/>
                  </div>
                  <div className="col-sm-8 mx-auto mt-4">
                    <input type="password" placeholder='Enter password'  name='password'
                    onChange={handleChange}
                    className='form-control'/>
                  </div>
                  <div className="col-sm-8 mx-auto d-flex justify-content-between mt-4">
                    <button type='submit' className='btn btn-primary '>Login</button>
                    <Link to='/register'>Register</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login