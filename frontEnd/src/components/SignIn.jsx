import '../Home.css'
import { GoogleLogin } from '@react-oauth/google'

export default function SignIn(){
    return (
    <>
        <h1>Currently signing in</h1>
        <GoogleLogin onSuccess={()=>alert("successfully signed-in")} onError={()=>alert("failed to sign-in")}></GoogleLogin>
    </>)
}