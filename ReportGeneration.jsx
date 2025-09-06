import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
const ReportGeneration = () => {
    const [data, setData] = useState([]); 
    const handlefetch = async () => {
        const res = await axios.get('http://localhost:5000/api/exams/report'); 
        console.log(res.data);
        setData(Array.isArray(res.data) ? res.data : [res.data
        ]);
    }
    useEffect(() => {
        handlefetch();
    }, []);
const handlePrint = (item) => {
    const printWindow = window.open('', '', 'width=900,height=650');
    printWindow.document.write(`
      <html>
        <head>
          <title>Exam Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #6f42c1; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            td, th { border: 1px solid #6f42c1; padding: 8px; text-align: left; }
            th { background-color: #f3e8ff; }
          </style>
        </head>
        <body>
          <h2>Exam Report - ${item.examTitle}</h2>
          <table>
            <tr><th>Examinee Name</th><td>${item.examineeName}</td></tr>
            <tr><th>Email</th><td>${item.examineeEmail}</td></tr>
            <tr><th>Total Marks</th><td>${item.totalMarks}</td></tr>
            <tr><th>Passing Marks</th><td>${item.passingMarks}</td></tr>
            <tr><th>Score</th><td>${item.score}</td></tr>
            <tr><th>Status</th><td>${item.status}</td></tr>
            <tr><th>Date of Exam</th><td>${item.attemptedAt}</td></tr>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  return (
    <div>
        <div className="container-fluid">
              <div className="row py-3 px-3 mt-3"> 
                <div className="col-sm-12 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="fw-bold" style={{ color: "#6f42c1" }}>Report Generation</h3>
                           <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th>Exam Name</th>
                                    <th>Examinee Name</th>
                                    <th>Total Marks</th>
                                    <th>Score</th>
                                    <th>Passing Marks</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => (
                                    <tr key={item._id}>
                                        <td>{i + 1}</td>
                                        <td>{item.examTitle}</td>
                                        <td>{item.examineeName}</td>
                                        <td>{item.totalMarks}</td>
                                        <td>{item.score}</td>
                                        <td>{item.passingMarks}</td>
                                        <td>{item.status}</td>
                    <td>{new Date(item.attemptedAt).toLocaleString()}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary" onClick={()=>{handlePrint(item)}}>Generate Report</button>
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

export default ReportGeneration