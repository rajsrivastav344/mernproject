import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Myresult = () => {
    const [data, setData] = useState([])
    const userId = localStorage.getItem('userId')
    const handlefetch = async () => {
        const res = await axios.get(`http://localhost:5000/api/exams/examinee-result/${userId}`);
        console.log(res)
        setData(Array.isArray(res.data.message) ? res.data.message : [res.data.message]);

    }
    useEffect(() => {
        handlefetch()
    }, [])
    // console.log(data);
    
    return (
        <div>
            <div className="row mt-1">
          <div className="col-sm-12">
            <div className="card mx-auto mt-2 "  style={{
                border: "1px solid #6f42c1",
                width: "a100%",
              }}>
              <div className="card-body">
                <div className="container p-0">
                  <h3 className="fw-bold" style={{ color: "#6f42c1" }}>Examinee Result</h3>
                 <table  className="table table-bordered text-center">
                <thead  className="table-secondary">
                    <tr>
                        <td>S.N</td>
                        <td>Exam name</td>
                        <td>Your Name</td>
                        <td>Total Marks</td>
                        <td>Score</td>
                        <td>Passing Marks</td>
                        <td>Status</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>

                    {data.map((item, i) => (
                        <tr key={item._id}>
                            <td>{i + 1}</td>
                            <td>{item.examId?.title}</td>
                            <td>{item.examineeId?.name || item.examineeId}</td>

                            <td>{item.totalMarks}</td>
                            <td>{item.score}</td>
                            <td>{item.passingMarks}</td>
                            <td>{item.status}</td>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
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

export default Myresult