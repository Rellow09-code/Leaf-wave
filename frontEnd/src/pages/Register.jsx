import { useNavigate } from 'react-router-dom'
import './SignIn.css'

export default function Register(){
    const navigate = useNavigate();

    const registration = async()=>{
                //extract data
                const username1 = document.getElementById('username').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const passwordC = document.getElementById('passwordC').value;

                if (password != passwordC){
                    alert('Password do not match');
                    return
                }
                //share login credential with the backend
                try{
                    const response = await fetch('http://localhost:3000/auth/signIn', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({username:username1,email:email,password:password}) 
                    });


                    const {message,token,user} = await response.json();

                    if (!token){
                        alert(message);
                        return;
                    }

                    const {id,picture,username} = user;


                    //store relavent authentication data to local storage
                    localStorage.setItem('token',token);
                    localStorage.setItem('id',id);
                    localStorage.setItem('picture',picture);
                    localStorage.setItem('username',username);
                    //redirect to home page
                    navigate('/');
        
                }catch(error){
                    alert('registration failed');
                    console.log(error);
                }
    }

    return(
        <>
        <main id='background'>
        <section id='mainOptions'>
            <h1>Register to Leaf Wave</h1>
            <section id='popUp'>
                <input id='username' placeholder='Username'></input>
                <input id='email' placeholder='Email'></input>
                <input id='password' placeholder='Password'></input>
                <input id='passwordC' placeholder='Confirm Password'></input>
                <button onClick={registration}>Register</button>
                <button onClick={()=>navigate('/SignIn')}>Sign In</button>
            </section>
        </section>
        </main>
        </>
    )
}