import { BrowserRouter as Router,Routes,Route,useLocation } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Navbar from "./component/Navbar/Navbar";
import CreatePost from "./pages/createPost/CreatePost";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./pages/home/Home";
import SinglePost from "./pages/SinglePost/SinglePost";
import About from "./pages/about/About";

function App() {
  
  
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/createpost" element={<CreatePost/>}/>
        <Route path="/singlepost/:id" element={<SinglePost/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </Router>
  );
}

export default App;
