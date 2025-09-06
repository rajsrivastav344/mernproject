import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const ChangePassword = () => {
    const id = localStorage.getItem('userId');
    const [form , setForm] = useState({
        op:'',
        np:'',
        cnp:''
    })
    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
       try{
        const res = await axios.put(`http://localhost:5000/api/examinee/change/${id}`,form)
         alert(res.data.message)
       }
       catch(er){
        console.log(er)
        // alert(res.data.message)
       }

    }

  return (
    <div>
        <div className="container-fluid">
           <div className="row py-3 px-3 mt-3">
            <div className="col-sm-8 mx-auto">
              <div className="card">
                <div className="card-body">
                      <form method='post' onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-9 my-2 mx-auto">
                    <input type="text" 
                    name='op'
                    onChange={handleChange}
                    placeholder='Enter Old password'   className="form-control"/>
                    </div>
                    <div className="col-sm-9 my-2 mx-auto">
                    <input type="text" 
                    name='np'
                    onChange={handleChange}
                    placeholder='Enter New password'   className="form-control"/>
                    </div>
                    <div className="col-sm-9 my-2 mx-auto">
                    <input type="text" 
                    name='cnp'
                    onChange={handleChange}
                    className="form-control"
                    placeholder='Enter Confirm password' />
                    </div>
                </div>
                <div className="col-sm-6 mx-auto">
                    <input type="submit" value="Update" className='btn btn-primary' />
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

export default ChangePassword