import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogOut from "./components/LogOut";

export default function Home(){
    //get the user data
    const [user,setUser] = useState(localStorage.getItem('id'));

    //redirect unsigned users
    const navigate = useNavigate()
    useEffect(()=>{
        if (!user){
            navigate('/SignIn');
        }
    },[navigate,user]);

    //abstract logout
    const handleLogOut = ()=>{
        LogOut();
        setUser(null);
    }
    
    return(
        <>
            <header>
                <input></input>
                <button onClick={handleLogOut}>Log out</button>
            </header>
            <main>
                <nav>
                    <button>Home</button>
                    <button>Friends</button>
                    <button>chats</button>
                </nav>
                <section>
                    
                </section>
            </main>
        </>
    )
}