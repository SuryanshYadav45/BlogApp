import React, { useEffect, useState } from "react";
import "./SinglePost.scss";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SinglePost = () => {
    const [loading, setloading] = useState(true);

    const { id } = useParams();
    const [singlePost, setsinglePost] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const q = query(collection(db, "posts"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (doc.id === id) {
                    setsinglePost(doc.data());
                    // console.log(doc.id, " => ", doc.data());
                } else {
                    return;
                }
            });
        };
        fetchdata();
        setTimeout(() => {
            setloading(false);
        }, 3000);
    }, []);

    return (
        <div className="singlepost">
            <div className="singlepostwrapper">
                {loading ? (
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <div className="imgdiv" >
                            <Skeleton className="skeleton" count={1} width={"100%"} height={450} style={{borderRadius:"10px"}} />
                        </div>
                        <div className="content">
                            <Skeleton className="skeleton" count={1} width={"100"} height={40}  />
                            
                            <Skeleton className="skeleton" count={1} width={"100%"} height={70} />
                            <Skeleton className="skeleton" count={1} width={200} height={20} />
                        </div>
                    </SkeletonTheme>
                ) : (
                    <>
                        <div className="imgdiv">
                            <img src={singlePost.postphotoUrl} alt="" />
                        </div>
                        <div className="content">
                            <h1>{singlePost.title}:</h1>
                            <p>{singlePost.description}</p>
                            <h4>Author: {singlePost.authorName}</h4>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SinglePost;
