import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    let [signIn,setSignIn] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if (signIn){
            navigate('/signIn');
        }
    },[navigate,signIn])
    
    return(
        <>
            <h1>Welcome to the homePage</h1>
            <button onClick={()=>setSignIn(true)}>Sign up</button>
        </>
    )
}