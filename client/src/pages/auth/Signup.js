import React,{useState} from 'react'
import Layout from '../../components/Layouts/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  
  const [id,setRollno] = useState("")
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const navigate=useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(process.env.REACT_APP_API);
    try {
      const res = await axios.post(
      "/api/v1/auth/register/",
      {
        id,
        name,
        password,
        email,
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate('/login');
      }
      else{
        toast.error(res.data.message);
      }
      
    } catch (error) {
      console.log('error occurred..');
      console.log(error);
      toast.error('Something went wrong!');
    }
  }
  return (
    <div>
      <Layout title={"Register-Vlabs"}>
        <div className='container-box'>
         
          <form onSubmit={handleSubmit} className='form-box'>
          <div className="mb-3">
    <label for="exampleInputRoll" className="form-label">Roll Number</label>
    <input type="text" onChange={(e)=>setRollno(e.target.value)} class="form-control" id="exampleInputRoll" placeholder='Enter your roll Number' value={id} required/>
    
  </div>


  <div className="mb-3">
    <label for="exampleInputName" className="form-label">Full Name</label>
    <input type="text" onChange={(e)=>setName(e.target.value)} class="form-control" id="exampleInputName" placeholder='Enter your full name' value={name} required/>

  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" class="form-control" onChange={(e)=>setEmail(e.target.value)} id="exampleInputEmail1" placeholder='Enter your email id' value={email} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" class="form-control" onChange={(e)=>setPassword(e.target.value)}  id="exampleInputPassword1" placeholder='Enter password' value={password} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
      </Layout>
    </div>
  )
}

export default Register
