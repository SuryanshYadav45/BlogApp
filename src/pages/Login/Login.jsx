import React,{useState} from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import "./Login.scss"
import { useDispatch } from 'react-redux';
import {login} from "../../store/slice/authslice";


const Login = () => {
    const dispatch=useDispatch();
    const [userExist, setuserExist] = useState(false)
    const navigate=useNavigate();
    const validate=async(e)=>
    {
        e.preventDefault();
        const email=e.target[0].value;
        const password=e.target[1].value;
        
        try {
             await signInWithEmailAndPassword(auth, email, password).then(()=>
             {
                
                dispatch(login());   
             })
             
             navigate("/")

        } catch (error) {
            setuserExist(true)
            console.log(error)
        }
    }
  return (
    <div className='login'>
        <div className="loginwrapper">
            <h2>Login </h2>
            <form onSubmit={validate}>
                <input type="email" placeholder='enter your email' required/>
                <br />
                <input type="password" placeholder='enter your password' required/>
                
                {userExist && <p style={{color:"red"}}>user not found (check your email and password again)</p> }
                <br />
                <button>Login</button>
            </form>
            <p>don't have an account? <a href="/signup"> signup now</a> </p>
        </div>
    </div>
  )
}

export default Login;