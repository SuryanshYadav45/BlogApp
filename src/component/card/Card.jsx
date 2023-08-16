import React, { useEffect, useState } from 'react';
import "./Card.scss"
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Card = (props) => {
  const [author, setauthor] = useState(false)
  const navigate=useNavigate()
  const para=props.data.description.slice(0,110)+"...";

  useEffect(() => {
    if (props.data.id === auth?.currentUser?.uid) {
        setauthor(true);
    }
}, [props.data.id]);
 
  
  const deletePost=async(id)=>{
    const postDoc=doc(db,"posts",id);
    await deleteDoc(postDoc);
    props.onDelete(id);
  }
 
  return (
    <div className='card'  >
      <span className='category'>{props.data.category}</span>
      {author && <button className='del' onClick={()=>deletePost(props.data.docId)}><FontAwesomeIcon icon={faTrash} style={{color:"white"}} /></button>}
        <img src={props.data.postphotoUrl}  alt="" />
        <div className="content">
            <h3>{props.data.title}</h3>
            <p className='description'>{para}</p>
            <Link to={`/singlepost/${props.data.docId}`}>Read More</Link>
        </div>
    </div>
  )
}

export default Card;