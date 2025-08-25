import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'
import './SignIn.css'
import {isEmailValid} from '../components/Helper'

export default function SignIn(){
    //top level variables declaration
    const navigate = useNavigate();

    const authenticate = async (credential)=>{

        //share login credential with the backend
        try{
            const response = await fetch('http://localhost:3000/auth/google', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: credential }) 
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
            alert('authentication failed');
            console.log(error);
        }
    }
    //manual authentication
    const signIn = async ()=>{
        //extract data
        const identifier = document.getElementById('email/username').value;
        const password = document.getElementById('password').value;

        let body;
        
        if (isEmailValid(identifier)){
            body = {password:password, email:identifier}
        }
        else{
            alert('using the username');
            body = {password:password, username:identifier}
        }
        //share login credential with the backend
        try{
            const response = await fetch('http://localhost:3000/auth/logIn', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body) 
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
            alert('authentication failed');
            console.log(error);
        }
    }

    return (
    <>
    <main id='background'>
        <section id='mainOptions'>
            <h1>Sign in</h1>
            <section id='popUp'>
                <input id='email/username' placeholder='Email or Username'></input>
                <input id='password' placeholder='Password'></input>
                <button onClick={signIn}>Sign In</button>
                <button onClick={()=>{navigate('/Register')}}>Register</button>
                <GoogleLogin onSuccess={(credential)=>authenticate(credential.credential)} onError={()=>alert("failed to sign-in")}></GoogleLogin>
            </section>
        </section>
    </main>
    </>)
}