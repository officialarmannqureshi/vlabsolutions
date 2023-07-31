import React from 'react';
import {Link} from 'react-router-dom';
const Footer = () => {
  return (
    <>
    <div className='footer-box text-light p-3'>
        <h4 className='text-center'>All right reserved &copy; Nazim Qureshi</h4>
    
    <p className='footer-menu mt-3 text-center'>
      <Link to="/about" style={{textDecoration: 'none'}} className='footer-menus'>About</Link>
      <Link to="/contact" style={{textDecoration: 'none'}} className='footer-menus'>Contact</Link>
      <Link to="/policy" style={{textDecoration: 'none'}} className='footer-menus'>Policy</Link>
      
    </p>
    </div>
    </>
  )
}

export default Footer
