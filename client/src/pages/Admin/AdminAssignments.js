import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import '../../styles/responsive css/dashboard.css'
const AdminAssignments = () => {
    return (
        <Layout>
            <div className='container-fluid' style={{height:"100vh",marginTop:'1rem'}}>
            <div className='container-dashboard'>
                <div className='dashboard-menu'>
                    <AdminMenu/> 
                </div>
                <div className='col-md-9'>
    
                </div>
    
            </div>
    
            </div>
    
        </Layout>
      )
}

export default AdminAssignments
