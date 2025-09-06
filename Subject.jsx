import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

const Subject = () => {
  
const [form,setForm] = useState({
  name:'',
  description:''
});
const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}
const [id,setId] = useState({
  id:''
});
const [edit , setEdit] = useState(null);
const handleSubmit = async(e)=>{
  e.preventDefault();
  try{
    if(edit){
      const res = await axios.put('http://localhost:5000/api/subject',form);
    alert("Updated Successfully");
    }else{
      const res = await axios.post('http://localhost:5000/api/subject',form);
    alert("Added Successfully");
    }
  }
  catch(er){
    alert("subject not Added");
    console.log(er)
  }
}
const [data , setData] = useState([]);
const handlefetch = async()=>{
  const res = await axios.get('http://localhost:5000/api/subject');
  setData(res.data)
}
useEffect(()=>{
handlefetch()
},[])

const handleDelete = async(id)=>{
  try
  {
    const res = await axios.delete(`http://localhost:5000/api/subject/${id}`);
    alert("subject Deleted Successfully")
    handlefetch()
  }catch(er){
    alert("Sorry Try Again Later")
    console.log(er);
    
  }


}

const handleEdit = (item)=>{
  setForm({
    name:item.name,
    description:item.description
  })
setEdit(true)
setId({
  id:item._id
});
}
  return (
    <div>
      <div className="container-fluid p-0">

        <div className="row ">
          <div className="col-sm-12 ">
            <div
              className="card"
              style={{
                border: "1px solid #6f42c1",
                minHeight: "320px",
                width: "100%",
              }}
            >

              <div className="">
        <form method="post" onSubmit={handleSubmit} className="border p-2 rounded" >
                  <div className="row ">
                    <div className="col-sm-12 ">
                      <h5 className="fw-bold" style={{ color: "#6f42c1" }}><i className="fa-solid fa-plus" style={{ marginRight: "8px" }}></i>Add New subject</h5>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-sm-12"><h6>subject Name:</h6></div>
                    <div className="col-sm-12 ">
                      <input
                        type="text" 
                        name='name' 
                        onChange={handleChange}
                        placeholder="Eg:25-26"
                        className="form-control" 
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-sm-12"><h6>Description</h6></div>
                    <div className="col-sm-12 ">
                      <textarea name="description" 
                      onChange={handleChange}className="form-control"  placeholder="" rows="2"></textarea>
                    </div>
                  </div>
                 
                  <button type="submit" className="btn btn-light text-white  mt-1" style={{ background: "#39064fff " }}>Add subject</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-12">
            <div
              className="card mx-auto mt-2"
              style={{
                border: "1px solid #6f42c1",
                width: "100%",
              }}
            >

              <div className="card-body">
                <div className="container p-0">
                  <h3 className="fw-bold" style={{ color: "#6f42c1" }}>subject List</h3>
                  <table className="table table-bordered text-center">
                    <thead className="thead-light-purple">


                      <tr>
                        <th> S.No.</th>
                        <th> subject Name</th>
                        <th> Description</th>
                        
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item,i)=>(
                        <tr key={item._id}>
                          <td>{i+1}</td>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>
                            <button className="btn-danger btn" 
                        onClick={()=>{handleDelete(item._id)}}
                            >Delete</button>
                            <button className="btn
                            btn-success"
                    onClick={()=>{handleEdit(item)}}
                            >Edit</button>
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
    </div>
  );
};

export default Subject;