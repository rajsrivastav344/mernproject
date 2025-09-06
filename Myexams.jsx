import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';

const Myexams = () => {
    const [data , setData] = useState([]);
    const handlefetch = async()=>{
        const res = await axios.get('http://localhost:5000/api/exams/exams')
        setData(res.data)
        // console.log(res.data[0])
    }
    useEffect(()=>{
        handlefetch();
    },[])
    // console.log(data)
  return (
    <div>
        <div className="container-fluid">
            <div className="r">
                <div className="col-sm-10 mx-auto">
                    <div className="card">
                        <div className="row">
                            <table className="table-hover ta table-bordered">
                                <thead>
                                    <tr>
                                        <th>S.N</th>
                                        <th>Exam Name</th>
                                        <th>Date</th>
                                        <th>Duration</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item,i)=>(
                                        <tr key={item._id}>
                                            <td>{i+1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.date}</td>
                                            <td>{item.duration}</td>
                                            <td>
        <Link className='btn btn-primary' to={`/userDashboard/getexam/`+item._id}>Start</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Myexams