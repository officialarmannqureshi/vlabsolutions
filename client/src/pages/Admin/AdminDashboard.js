import {React,useEffect ,useState} from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import { useAuth} from '../../context/auth';
import {CgProfile} from 'react-icons/cg';
import {BsFacebook} from 'react-icons/bs';
import {BsLinkedin} from 'react-icons/bs';
import {BsTwitter} from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from "../../private";
import '../../styles/responsive css/dashboard.css'
const AdminDashboard = () => {
    const [auth]=useAuth();
    const [data, setData] = useState([]);

  const fetchInfo = () => {
    return axios.get(baseUrl+'/api/v1/auth/getall/').then((res) => setData(res.data));
  };


  const [assignmentdata, setAssignmentData] = useState([]);

  const fetchAssignmentInfo = () => {
    return axios.get(baseUrl+'/api/v1/auth/getallassignments/').then((res) => setAssignmentData(res.data));
  };

  useEffect(() => {
    fetchInfo();
    fetchAssignmentInfo();
  }, []);

  const totalassignments=assignmentdata?.result?.length || 0;
  const totalstudents=data?.studentsData?.length || 0;
  return (
    <Layout>
      <div className='container-fluid absolute' style={{height:"100vh",marginTop:'1rem'}} >
       
      <div className='container-dashboard'>
        <div className='dashboard-menu'>
            <AdminMenu/> 
        </div>
        <div className='dashboard-details'>
            <div className='text-center'>
            
            <section className=''>
  <div className="container  dashboard-details">
    <div className="row d-flex  align-items-center h-100 dashboard-details-inside" >
      <div className="col-md-12 col-xl-4">

        <div className="card">
          <div className="card-body text-center">
            <div className="mt-3 mb-4">
              <CgProfile className='icon'/>
            </div>
            <h4 className="mb-2">{auth?.user?.name}</h4>
            <p className="text-muted mb-4">Lab Assistant [CSE] <span class="mx-2">|</span> Kiit University <span class="mx-2">|</span> +91 9999991111
            </p>
            <p>Lab id : {auth?.user?.id} <span class="mx-2">|</span> Email:{auth?.user?.email}</p>
            <div className="mb-4 pb-2">
            <NavLink to={"https://www.linkedin.com/in/nazim-qureshi-9b5189215/"} target='_blank' style={({isActive})=>({
            color:isActive ? 'black':'black',
            textDecoration: 'none',
            
            
          })}><BsFacebook className='icon' style={{fontSize: "" ,marginRight:"25px"}} /></NavLink>
            <NavLink to={"https://www.linkedin.com/in/nazim-qureshi-9b5189215/"} target='_blank' style={({isActive})=>({
            color:isActive ? 'black':'black',
            textDecoration: 'none',
            
            
          })}><BsLinkedin className='icon' style={{fontSize: "",marginRight:"25px"}}/></NavLink>
            <NavLink to={"https://www.linkedin.com/in/nazim-qureshi-9b5189215/"} target='_blank' style={({isActive})=>({
            color:isActive ? 'black':'black',
            textDecoration: 'none',
            
            
          })}><BsTwitter className='icon' style={{fontSize: "",marginRight:"25px"}}/></NavLink>
            </div>
            
            <div className="d-flex justify-content-between text-center mt-5 mb-2">
              <div>
                <p className="mb-2 h5">{totalstudents}</p>
                <p className="text-muted mb-0">Students</p>
              </div>
              <div className="px-3">
                <p className="mb-2 h5">{totalassignments}</p>
                <p className="text-muted mb-0">Assignments Received</p>
              </div>
              <div>
                <p className="mb-2 h5">0</p>
                <p className="text-muted mb-0">Assignments Pending</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
            </div>
        </div>
        
      </div>

      </div>
    </Layout>
  )
}

export default AdminDashboard
