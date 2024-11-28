import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'

const AdminAssignments = () => {
    return (
        <Layout>
            <div className='container-fluid' style={{height:"100vh"}}>
            <div className='row mt-5'>
                <div className='col-md-3'>
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
