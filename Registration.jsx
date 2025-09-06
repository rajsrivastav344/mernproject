import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Registration = () => {
    const [form,setForm] = useState({
        name:'',
        email:'',
        password:'',
        college:'',
        course:'',
        branch:'',
        session:'',
        phone:''
    })
    const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
       try{
         const res = await axios.post('http://localhost:5000/api/examinee',form)
         alert("Registered successfully")
         window.location.href='/'
       }catch(er){
        console.log(er)
        alert("Sorry Try again later")
       }   


    }

    const [data ,setData] = useState([])
    const handlefetch = async()=>{
   try{
         const res = await axios.get('http://localhost:5000/api/session');
        setData(res.data)
   }catch(er){
    console.log(er)
   }


    }
    useEffect(()=>{
        handlefetch();
    },[])
    console.log(data)
  return (
    <div>
        <div className="container-fluid">
            <div className="row my-5">
                <div className="col-sm-10 mx-auto py-5">
                    <div className="card">
                        <div className="card-body">
                            <form method='POST' onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-sm-8 mx-auto">
                                        <input type="text" placeholder='Enter Name' 
                                        name='name' className='form-control' onChange={handleChange} required/>
                                    </div>
                                    <div className="col-sm-8 mx-auto mt-4">
                                        <input type="email" placeholder='Enter Email' 
                                        name='email' className='form-control'onChange={handleChange} required/>
                                    </div>
                                    <div className="col-sm-8 mx-auto mt-4">
                                        <input type="password" placeholder='Enter Password' name='password' className='form-control'onChange={handleChange} required/>
                                    </div>
                                    <div className="col-sm-8 mx-auto mt-4">
                                        <input type="text" placeholder='Enter College Name' name='college' className='form-control'onChange={handleChange} required/>
                                    </div>
                                    <div className="col-sm-8 mx-auto mt-4">
                                        <input type="text" placeholder='Enter Course Name' name='course' className='form-control'onChange={handleChange} required/>
                                    </div>
                                    <div className="col-sm-8 mx-auto mt-4">
                                        <input type="text" placeholder='Enter Branch Name' name='branch' className='form-control'onChange={handleChange} required/>
                                    </div>
                                    <div className="col-sm-8 mx-auto mt-4">
                <select name='session' id='' onChange={handleChange} className='form-select'>
                        <option value="">Select Session</option>

                        {data.map((item)=>(
                        <option key={item._id} value={item._id}>{item.name}
                        </option>
                                ))}
                        </select>
                                    </div>
                                    <div className="col-sm-8 mx-auto mt-4">
                                        <input type="text" placeholder='Enter Phone Number' name='phone' className='form-control' onChange={handleChange} required/>
                                    </div>  
                                    <div className="col-sm-8 mx-auto mt-4">
                                        <button type='submit' className='btn btn-primary'>Register</button>
                                    </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Registration