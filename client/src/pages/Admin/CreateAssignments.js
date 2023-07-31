import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';
const CreateAssignments = () => {
  const [auth]=useAuth();
  // const [filename,setFilename]=useState("");
  const [uploadedby,setUploadedby]=useState("");
  const [file,setFile]=useState("");
  const [assignment,setAssignment]=useState("");
  console.log(file);
  console.log(uploadedby);
  console.log(assignment);
  const setFiles =(e)=>{
    if(e.target.files){
    const {value}=e.target.files[0];
    setFile(value);
  }
    
    
    
  }
  
  const handleText=(e)=>{
    const {value}=e.target;
    setAssignment(value);
  }
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    setUploadedby(auth?.user?.name);
    try{
      const res = await axios.post("/api/v1/auth/create-assignment/",{
        uploadedby,
        file,
        assignment,
      });
      if(res.data.success){
        toast.success(res.data.message);
      }
      else{
        toast.error(res.data.message);
      }
    }
    catch(error){
      toast.error("Something went wrong");
    }
  };
  
  return (
    <Layout>
    <div className='' style={{height:"90vh"}}> 
    <div className='assign-title center '>
      <div className='text-center'>
      <div className='assign-title-name '>
        <div className='item1 assign-title-item text-center'>Total Uploaded <span className='assign-span'>0</span></div>
        <div className='item2 assign-title-item text-center'>Total Assigned <span className='assign-span'>0</span></div>
        <div className='item3 assign-title-item text-center'>Total Marked <span className='assign-span'>0</span></div>
      </div>
      </div>
    </div>
    
    <form className='' onSubmit={handleSubmit}>
      
      <div >
      <label className='assign-label-1'>Write or Upload the questions here !</label>
      <input type="file" className="form-control assign-label-1" id="customFile" name='file' onChange={setFiles} value={file} />
      <p className='text-center' style={{fontSize:"17px"}}>or</p>
      <div className='assign-form-div-1'>

      <textarea cols={150} rows={10} placeholder='Write here' autoComplete='on' className='assign-textarea' onChange={handleText} value={assignment} name='assignment'></textarea>
      <button type="button" class="btn btn-primary assign-button " data-toggle="button" aria-pressed="false" autocomplete="off" >
  Upload
</button>
      </div>
      
      </div>
      
    </form>
    </div>
    </Layout>
      

    
  )
}

export default CreateAssignments
