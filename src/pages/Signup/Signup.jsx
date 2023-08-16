import React from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Signup.scss";
import { useDispatch } from "react-redux";
import { login } from "../../store/slice/authslice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      dispatch(login());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signup">
      <div className="signwrapper">
        <h4 className="title">SignUp</h4>
        <hr />
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter your name" required/>
          <br />
          <input type="email" placeholder="Enter your email" required/>
          <br />
          <input type="password" placeholder="Enter your password" required/>
          <br />
          <button>SignUp</button>
        </form>
        <p>
          already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
