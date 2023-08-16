import React, { useEffect, useState } from 'react';
import "./Home.scss";
import Card from '../../component/card/Card';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getDocs(collection(db, "posts"));
            const fetchedPosts = data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
            setPosts(fetchedPosts);
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        };
        fetchPosts();
    }, []);

    const handlePostDelete = (deletedPostId) => {
        setPosts(posts.filter(post => post.docId !== deletedPostId));
    };

    console.log(posts);

    return (
        <div className='home'>
            <div className="homewrapper">
                {loading ? (
                    <SkeletonTheme baseColor="#202022" highlightColor="#444">
                        <div className='skeleton'>
                        {[...Array(8)].map((_, index) => (
                            <Skeleton key={index} width={320} height={500} />
                        ))}
                        </div>
                    </SkeletonTheme>
                ) : (
                    posts.map((item) => (
                        <Card key={item.docId} data={item} onDelete={handlePostDelete} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
