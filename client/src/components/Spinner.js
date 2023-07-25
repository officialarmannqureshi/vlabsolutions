import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
const Spinner = () => {
    const [count,setCount]= useState(5);
    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect (()=>{
        const interval=setInterval(() => {
                setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 && navigate('/login',{
            state:location.pathname,
        });
        return ()=> clearInterval(interval);
    },[count,navigate,location]);
  return (
    <>
    <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"100vh"}}>
  
  <h5 className='Text-center'>Redirecting to you in {count} seconds</h5>
  <div className="spinner-border " style={{height:"3rem",width:"3rem"}} role="status">
    <span className="visually-hidden"  >Loading...</span>
  </div>
</div>
    
    </>
  )
}

export default Spinner
