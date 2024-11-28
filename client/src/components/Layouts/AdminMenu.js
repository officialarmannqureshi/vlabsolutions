import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
  
    <div className='Text-center'>

    <div className="list-group">
  <NavLink to="/admin/dashboard/profile" className="list-group-item list-group-item-action active" aria-current="true">
    Profile
</NavLink>
  <NavLink to="/admin/dashboard/students" className="list-group-item list-group-item-action">Students</NavLink>
  <NavLink to="/admin/dashboard/assignments" className="list-group-item list-group-item-action">Assignments</NavLink>
  <NavLink to="/admin/dashboard/submissions" className="list-group-item list-group-item-action">Submissions</NavLink>
  <NavLink to="/admin/dashboard/performance" className="list-group-item list-group-item-action">Performance</NavLink>
</div>


    </div>
 
    </>
  )
}

export default AdminMenu
