import { useState,useEffect,useContext,createContext} from "react";
import axios from "axios";
const authContext=createContext();

//initially we provide nothing
// const [auth,setAuth] =useState({
//     user:null,
//     token:"",
// });


const AuthProvider =({children})=>{
    const [auth,setAuth] = useState({
        user:null,
        token:"",
    })

    //default axios
    axios.defaults.headers.common['Authorization']=auth?.token;


    useEffect (()=>{
        const data=localStorage.getItem('auth');
        if(data){
            const ParseData=JSON.parse(data);
            setAuth({
                ...auth,
                user:ParseData.user,
                token:ParseData.token,
            })
        }
    },[auth]);
    return (<authContext.Provider value={[auth,setAuth]}>
        {children}
    </authContext.Provider>)
}


//custom hooks

const useAuth=()=>useContext(authContext);

export {useAuth,AuthProvider};