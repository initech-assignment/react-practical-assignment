import React, {useEffect, useState} from 'react';
import imageLike from "../images/like.png";
import {useDispatch, useSelector} from "react-redux";
import {MAIN_URL} from "../utils/constants";
import Comment from "./Comment";
import AddComment from "./AddComment";
import EditPost from "./EditPost";
import {Button} from "react-bootstrap";
import {setTotalPages} from "../redux/actions/gActions";

const Post = ({post, setPageData}) => {

    const [currentPost, setCurrentPost] = useState(post);
    const pageNumber = useSelector(state => state.pageNumber);
    const userName = useSelector(state => state.userName);
    const date = new Date(Number(currentPost.date)).toString().slice(0, 24);
    const dispatch = useDispatch();


    useEffect(() => {
        setCurrentPost(post);
    }, [post]);

    const addLike = (flag) => {
        if (!(currentPost.likes.includes(userName) || currentPost.dislikes.includes(userName))) {
            const newLikes = [...currentPost.likes];
            const newDislikes = [...currentPost.dislikes];
            if (flag) {
                newLikes.push(userName);
            } else {
                newDislikes.push(userName);
            }

            const objLikes = {
                likes: newLikes,
                dislikes: newDislikes
            }
            fetch(`${MAIN_URL}/post/${currentPost.id}/`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(objLikes)
            }).then(resp => resp.json())
                .then(data => {

                    setCurrentPost(prevPost => ({
                        ...prevPost,
                        likes: [...data.result.likes],
                        dislikes: [...data.result.dislikes]
                    }));
                })

        }

    }
    const handleClickDeletePost = () => {
        fetch(`${MAIN_URL}/post/${currentPost.id}/`, {
            method: 'DELETE'
        }).then(() => {
            fetch(`${MAIN_URL}/post/page/${pageNumber}`)
                .then(response => response.json())
                .then(data => {
                    dispatch(setTotalPages(data.totalPages))
                    setPageData(data);
                })
                .catch((e) => {
                    console.log(e);
                })

        })

    }


    return (
        <div style={{width: '300px', height: '430px', border: '1px solid #ccc', margin: '10px'}}>
            <div className='text-center'><span className='fs-3'>{currentPost.title}</span></div>
            <div>Author: {currentPost.username}</div>
            <div>{date}</div>
            <div className="w-100"><img alt={currentPost.imageSrc}
                                        className='h-auto col-12 p-0 img-fluid rounded-1'
                                        src={currentPost.imageSrc}/></div>
            {!(currentPost.likes.includes(userName) || currentPost.dislikes.includes(userName)) &&
                <div className="d-flex align-items-center">
                    <div style={{marginRight: '10px'}} onClick={() => addLike(true)}>
                        <a className='text-decoration-underline' role='button'>Like</a>
                    </div>
                    <div style={{marginRight: '10px'}}>
                        <img style={{maxWidth: '20px', maxHeight: '20px', marginLeft: '4px'}} className='mb-1'
                             src={imageLike}
                             alt="like-icon"/> {currentPost.likes.length - currentPost.dislikes.length}
                    </div>
                    <div onClick={() => addLike(false)}>
                        <a className="text-decoration-underline" role='button'>Dislike</a>
                    </div>
                </div>

            }

            {currentPost.likes.includes(userName) &&
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{marginRight: '10px'}}>
                        <a style={{pointerEvents: 'none', color: 'purple', textDecoration: 'underline'}}
                           role='button'>Liked</a>
                    </div>
                    <div style={{marginRight: '10px'}}>
                        <img style={{maxWidth: '20px', maxHeight: '20px'}} className='mb-2' src={imageLike}
                             alt="like-icon"/> {currentPost.likes.length - currentPost.dislikes.length}
                    </div>
                    <div>
                        <a style={{pointerEvents: 'none', color: 'grey', textDecoration: 'underline'}}
                           role='button'>Dislike</a>
                    </div>
                </div>

            }
            {currentPost.dislikes.includes(userName) &&
                <div style={{display: 'flex', alignItems: 'start'}}>
                    <div style={{marginRight: '10px'}}>
                        <a style={{pointerEvents: 'none', color: 'gray', textDecoration: 'underline'}}
                           role='button'>Liked</a>
                    </div>
                    <div style={{marginRight: '10px'}}>
                        <img style={{maxWidth: '20px', maxHeight: '20px'}} className='mb-2' src={imageLike}
                             alt="like-icon"/> {currentPost.likes.length - currentPost.dislikes.length}
                    </div>
                    <div>
                        <a style={{pointerEvents: 'none', color: 'purple', textDecoration: 'underline'}}
                           role='button'>Disliked</a>
                    </div>
                </div>

            }

            <div className='row'>

                {(userName === currentPost.username) &&
                    <div className='row'>
                        <div className='col-3'><EditPost currentPost={currentPost} setCurrentPost={setCurrentPost}/>
                        </div>
                        <div className='col-5'>
                            <Button style={{fontSize: '10px', padding: '1px', color: 'red'}} className='btn'
                                    variant='link' onClick={handleClickDeletePost}>
                                Delete post
                            </Button>
                        </div>
                    </div>
                }
                <div className='col-4'><AddComment currentPost={currentPost} setCurrentPost={setCurrentPost}
                                                   user={userName} postId={currentPost.id}/></div>
            </div>

            <div style={{overflowY: 'auto', maxHeight: '128px', maxWidth: '100%'}}>
                {currentPost.comments.map((c, index) => <ul key={index}><Comment key={index} currentPost={currentPost}
                                                                                 setCurrentPost={setCurrentPost}
                                                                                 user={userName} comment={c}/></ul>)}
            </div>


        </div>


    );
};

export default Post;