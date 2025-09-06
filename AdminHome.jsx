import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdminHome = () => {
    const [data,setData] = useState([]);
    const handlefetch = async()=>{
        const res = await axios.get('http://localhost:5000/api/admindashboard/')
        setData(res.data);
    }
    useEffect(()=>{
        handlefetch()
    },[])
    console.log(data)
  return (
    <div>
        {data.totalExaminees}
        {data.totalExams}
        {data.totalSubject}

    </div>
  )
}

export default AdminHome