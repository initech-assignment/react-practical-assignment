import React, {useEffect, useState} from 'react';
import {MAIN_URL} from "../utils/constants";
import EditComment from "./EditComment";
import login from "./Login";


const Comment = ({currentPost, user, setCurrentPost, comment}) => {

    const [currentComment, setCurrentComment] = useState(comment);
    const date = new Date(Number(currentComment.date)).toString().slice(0, 24);

    useEffect(() => {
        setCurrentComment(comment);
    }, [comment]);

    const handleClickDeleteComment = () => {
        fetch(`${MAIN_URL}/comment/${currentComment.id}/`, {
            method: 'DELETE'
        }).then(resp => resp.json())
            .then(data => {
                const newComments = currentPost.comments.filter(item => item.id !== data.result.id);
                const newCurrentPost = {...currentPost};
                newCurrentPost.comments = [...newComments];
                setCurrentPost(newCurrentPost);

            }).catch(e => console.log(`Can't delete comment ${e}`));
    }

    const addLike = (flag) => {
        const newLikes = [...currentComment.likes];
        const newDislikes = [...currentComment.dislikes];
        if(flag){
           newLikes.push(user);
        }else{
            newDislikes.push(user);
        }

        const objLikes = {
            text: currentComment.text,
            likes: newLikes,
            dislikes: newDislikes
        }


        fetch(`${MAIN_URL}/comment/${currentComment.id}/`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(objLikes)
        }).then(resp => resp.json())
            .then(data => {

                setCurrentComment(data.result);

            }).catch(e => console.log(`Can't update comment's likes ${e}`))


    }

    return (




        <div>

            <li style={{listStyleType: 'none', padding: '1px 40px 1px 1px'}} className='container'>
                <div style={{fontSize: '10px'}}>
                    <div>{date}</div>
                    <div><b>{currentComment.username}:</b> {currentComment.text}</div>

                    <div className='row border-bottom'>
                        {currentComment.likes.includes(user) &&
                            <div className='row col-6'>
                        <a className='col-1' role='button' style={{ pointerEvents: 'none', color: 'purple', textDecoration: 'underline' }}>Liked </a>

                        <div className='col-1 mx-1'>{currentComment.likes.length - currentComment.dislikes.length}</div>

                        <a className='col-1' role='button' style={{ pointerEvents: 'none', color: 'grey', textDecoration: 'underline' }}>Dislike</a>
                            </div>
                    }
                        {currentComment.dislikes.includes(user) &&
                            <div className='row col-6'>
                                <a className='col-1' role='button' style={{ pointerEvents: 'none', color: 'grey', textDecoration: 'underline' }}>Like </a>

                                <div className='col-1 mx-1'>{currentComment.likes.length - currentComment.dislikes.length}</div>

                                <a className='col-1' role='button' style={{ pointerEvents: 'none', color: 'purple', textDecoration: 'underline' }}>Disliked</a>
                            </div>
                        }
                        {!(currentComment.likes.includes(user) || currentComment.dislikes.includes(user)) &&
                            <div className='row col-6'>
                                <a className='col-1 text-decoration-underline' role='button' onClick={() => addLike(true)}>Liked </a>

                                <div className='col-1 mx-1'>{currentComment.likes.length - currentComment.dislikes.length}</div>

                                <a className='text-decoration-underline col-1' role='button' onClick={() => addLike(false)}>Dislike</a>
                            </div>
                        }
                        <div className='col-6'>
                            {user === currentComment.username &&
                                <div className='d-flex align-items-center'>
                                    <EditComment comment={currentComment} setCurrentComment={setCurrentComment}/>
                                    <a className="text-decoration-underline col-1" role='button'
                                       onClick={() => handleClickDeleteComment()}>Delete</a>
                                </div>
                            }
                        </div>
                    </div>
                </div>


            </li>

        </div>
    )
        ;
};

export default Comment;