import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addLikeAction} from "../redux/actions/gActions";
import {MAIN_URL} from "../utils/constants";


const Post = ({id}) => {


    const posts = useSelector(state => state.pageData.result);
    const userName = useSelector(state => state.userName)
    const currentPostIndex = posts.findIndex(item => item.id === id);
    const [likes, setLikes] = useState(posts[currentPostIndex].likes);
    const [dislikes, setDislikes] = useState(posts[currentPostIndex].dislikes);
    const date = new Date(Number(posts[currentPostIndex].date)).toString().slice(0, 24);
    const dispatch = useDispatch();


    useEffect(() => {
        const obj = {
            likes: likes,
            dislikes: dislikes
        }

        fetch(`${MAIN_URL}/post/${id}/`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(data => console.log(data.success))
            .catch(e => console.log(`Can't send likes: ${e}`))


    }, [likes]);

    const addLike = (flag) => {
        if (!(posts[currentPostIndex].likes.includes(userName) || posts[currentPostIndex].dislikes.includes(userName))) {

            const tempLikes = [...likes];
            const tempDislikes = [...dislikes];
            if (flag) {
                tempLikes.push(userName);
            } else {
                tempDislikes.push(userName);
            }

            const likeData = {
                currentPostIndex: currentPostIndex,
                likes: tempLikes,
                dislikes: tempDislikes
            }
            dispatch(addLikeAction(likeData));
            setLikes(tempLikes);
            setDislikes(tempDislikes);
        }

    }


    return (
        <div className="w-70 row border border-black rounded-3 m-1">
            <div className='text-center'><span className='text-bg-danger'>{posts[currentPostIndex].username}</span>
                <span> {posts[currentPostIndex].title}</span></div>
            <div>{date}</div>
            <div><img className='col-12 p-0' src={posts[currentPostIndex].imageSrc}/></div>
            <p>ID: {id}</p>
            <div>
                <div onClick={() => addLike(true)}>Like</div>
                <div>{likes.length - dislikes.length}</div>
                <div onClick={() => addLike(false)}>Dislike</div>
            </div>


            <p>Comments: {posts[currentPostIndex].comments.length}</p>
        </div>
    );
};

export default Post;