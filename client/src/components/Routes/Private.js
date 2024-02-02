import { useState,useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { baseUrl } from "../../private";
export default function PrivateRoute(){
    const [ok,setOk]=useState(false);
    const [auth] = useAuth();

    useEffect(()=> {
        const autoCheck= async()=>{
            const res= await axios.get(baseUrl+'/api/v1/auth/user-auth/');
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }
        if(auth?.token)
            autoCheck();
        
    },[auth?.token]);

    return ok? <Outlet/>:<Spinner/>;
}