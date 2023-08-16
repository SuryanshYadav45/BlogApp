// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import "./Navbar.scss";
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLocation } from 'react-router-dom';
// import { signOut } from "firebase/auth";
// import { auth } from '../../firebase';
// import { logout } from "../../store/slice/authslice"
// import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// const Navbar = () => {
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const showNavbar = location.pathname !== "/login" && location.pathname !== "/signup";
//     const isAuth = useSelector((state) => state.auth.isAuthenticated);
//     console.log(isAuth);
//     const logoutuser = () => {
//         signOut(auth);
//         dispatch(logout());

//     }
//     console.log(auth?.currentUser?.displayName)
//     return (
//         showNavbar && (
//             <>
//             <div className='navbar'>
//                 <div className="navbarWrapper">
//                     <Link className='title' to="/">BlogApp</Link>
//                     <div className="right">
                       
//                         <ul>
//                         <li><Link to="/about">About</Link></li>
//                         <li><Link to="/createpost">Create Blog</Link></li>
//                         {isAuth ? <button className='logoutbtn' onClick={logoutuser}><FontAwesomeIcon icon={faRightFromBracket} /></button> : <a href="/login">Login</a>}
//                     </ul>
//                     </div>

//                 </div>
//             </div>
//             <div className="menu">
//                     <ul>
//                         <li><Link to="/about">About</Link></li>
//                         <li><Link to="/createpost">Create Blog</Link></li>
                       
//                     </ul>
//                    
//             </div>
//             </>
//         )
//     );
// }

// export default Navbar;
import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { logout } from "../../store/slice/authslice"
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const showNavbar = location.pathname !== "/login" && location.pathname !== "/signup";
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    console.log(isAuth);
    const logoutuser = () => {
        signOut(auth);
        dispatch(logout());

    }
  const [toggle, setToggle] = useState(false);

  const toggleView = () => {
    setToggle(!toggle);
  };

  return (
    showNavbar &&
    <>
      <div className="navbar">
        <div className="innernav">
        <Link to="/">BlogApp</Link>

        <div className="wrapper">
          
          <div className="menuicon">
          {!toggle ? (
            <FontAwesomeIcon  icon={faBars} onClick={toggleView} />
          ) : (
            <FontAwesomeIcon  icon={faTimes} onClick={toggleView} />
          )}
          </div>
          <div className="navbarright">
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/createpost">Create Blog</Link>
              </li>
              
            </ul>
            {isAuth ? <button className='logbtn' onClick={logoutuser}>Logout</button> : <Link className='logbtn' to="/login">Login</Link>}
          </div>
        </div>
        </div>
      </div>
      {toggle && (
        <div className="submenu">
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/createpost">Create Blog</Link>
            </li>
            <li>{isAuth ? <button className='logbtn' onClick={logoutuser}>Logout</button> : <Link className='logbtn' to="/login">Login</Link>}</li>
          </ul>
          
        </div>
      )}
      
    </>
  );
};

export default Navbar;
