import React from 'react'
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  // const [prev,setPrev]=useState('profile');

 
  
  // function handleActive(e) {
  //   console.log("handleActive called");
  //   console.log(prev);
  //   let id=e.target.id;
  //   document.getElementById(id).classList.add('active');
  //   document.getElementById(prev).classList.remove('active');
  //   useEffect(() => {
  //     setPrev(id);
      
  //   }, [prev]);
  // }
  return (
    <>
  
    <div className='Text-center'>

    <div className="list-group">
  <NavLink to="/dashboard/admin/profile" className="list-group-item list-group-item-action" aria-current="true" activeClassName="active" id='profile'>
    Profile
</NavLink>
  <NavLink to="/dashboard/admin/students" className="list-group-item list-group-item-action" activeClassName="active" id='student'>Students</NavLink>
  <NavLink to="/dashboard/admin/assignments" className="list-group-item list-group-item-action" activeClassName="active" id='assignment'>Assignments</NavLink>
  <NavLink to="/dashboard/admin/submissions" className="list-group-item list-group-item-action" activeClassName="active" id='submission'>Submissions</NavLink>
  <NavLink to="/dashboard/admin/performance" className="list-group-item list-group-item-action" activeClassName="active" id='performance'>Performance</NavLink>
</div>


    </div>
 
    </>
  )
}

export default AdminMenu
