import React from 'react';
import "./CreatePost.scss";
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {auth, db, storage} from "../../firebase"
import {addDoc, collection, updateDoc} from "firebase/firestore"
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';


const CreatePost = () => {
    const authenticated=useSelector((state)=>state.auth.isAuthenticated);
    const [upload, setupload] = useState(0)
    const [authorName, setauthorName] = useState("");
    const [title, settitle] = useState("")
    const [category, setcategory] = useState("tech");
    const [description, setdescription] = useState("")
    const [file, setFile] = useState(null);
    const [uploading, setuploading] = useState(false)
    const postsRef=collection(db,"posts")
    const navigate=useNavigate();
    console.log(authenticated)
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
      };

    const uploadPost=async(e)=>
    {
        e.preventDefault();
        setuploading(true);
        const timestamp = new Date().getTime();
        const storageRef = ref(storage, `bg/${timestamp}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const newPostRef=await addDoc(postsRef,{authorName,title,category,description,id:auth.currentUser.uid,postphotoUrl: ''})



        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setupload(progress)
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    await updateDoc( newPostRef, {
                        postphotoUrl:downloadURL
                      });
                      navigate("/")
                      setuploading(false);
                });
            }
            );
            
           
    }


  return (
    authenticated ? <div className='post'>
    <div className="postwrapper">
        <h3>Create your Blog</h3>
        <hr />
        <form >
        <label htmlFor="writer">Enter the name of the author:</label>
            <input type="text" name='writer'  onChange={(e)=>setauthorName(e.target.value)} required />
            <br />
            <label htmlFor="title">Enter the title of the blog:</label>
            <input type="text" name='title'  onChange={(e)=>settitle(e.target.value)} required/>
            <br />
            <div className="selectdiv">
            <label htmlFor="tech">Select the category:</label>
            <select name="tech" id="cars" onChange={(e)=>setcategory(e.target.value)}>
                <option value="tech">Tech</option>
                <option value="Values">Values</option>
                <option value="Education">Education</option>
                <option value="Sports">Sports</option>
                <option value="Finance">Finance</option>
                <option value="Politics">Politics</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Wisdom">Wisdom</option>
                <option value="Any Other">Any Other</option>
                
            </select>
            </div>
            <br />
            <label htmlFor="desc">Description:</label>
            <textarea rows="10" name='desc' cols="30" type="text"  onChange={(e)=>setdescription(e.target.value)} required/>
            <br />
            {/* <label htmlFor="image">upload the image:</label>
            <br />
            <input name='image' type="file" onChange={handleFileChange} placeholder='upload the image' /> */}
                    <label htmlFor="file" className="avatarlabel">
                    <FontAwesomeIcon icon={faFolderPlus} style={{color:"white",fontSize:"30px"}}/>
                    <span style={{marginLeft:"10px"}}>Add Image</span>
                    {uploading && <p style={{marginLeft:"10px"}}>{`Upload is ${upload?.toFixed(1)} % done`}</p>}
                    </label>
                  <input style={{ display: "none" }} onChange={handleFileChange} type="file" id="file" />
            <button onClick={uploadPost} className='postbtn'>Post</button>
        </form>
    </div>
</div> : <div className='nouser'>
<div className='nouserwrapper'>
    <h1>Looks like you haven't logged in</h1>
<p>Inorder to create and post a blog on the website, you must log in first.</p>
<Link to="/login" className='loginredirect' >LOGIN </Link>

</div>
</div> 
  )
}

export default CreatePost