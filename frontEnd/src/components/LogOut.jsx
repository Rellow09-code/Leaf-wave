import { useNavigate } from "react-router-dom";

export default function LogOut(){
    //Remove login data from the app
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('picture');
}