import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
  
    <div className='Text-center'>

    <div className="list-group">
  <NavLink to="/dashboard/admin/profile" className="list-group-item list-group-item-action active" aria-current="true">
    Profile
</NavLink>
  <NavLink to="/dashboard/admin/students" className="list-group-item list-group-item-action">Students</NavLink>
  <NavLink to="/dashboard/admin/assignments" className="list-group-item list-group-item-action">Assignments</NavLink>
  <NavLink to="/dashboard/admin/submissions" className="list-group-item list-group-item-action">Submissions</NavLink>
  <NavLink to="/dashboard/admin/performance" className="list-group-item list-group-item-action">Performance</NavLink>
</div>


    </div>
 
    </>
  )
}

export default AdminMenu
