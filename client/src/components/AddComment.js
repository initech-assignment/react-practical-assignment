import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {MAIN_URL} from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {setPageAction} from "../redux/actions/gActions";

const AddComment = ({currentPost, user, setCurrentPost, postId}) => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState();


    const handleClose = () => setShow(false);
    const handleSave = () => {
        const commentObj = {
            text: text,
            postId: postId,
            username: user
        };

        fetch(`${MAIN_URL}/comment/`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(commentObj)
        })
            .then(resp => resp.json())
            .then(data => {
                const newComments = [...currentPost.comments];
                newComments.push(data.result);
                const newCurrentPost = {...currentPost};
                newCurrentPost.comments = [...newComments];
                setCurrentPost(newCurrentPost);
            }).catch(e => console.log(`Can't save comment to backend: ${e}`))
        setShow(false);
    }
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button style={{fontSize: '10px', padding: '1px'}} className='btn' variant='link' onClick={handleShow}>
                Add comment
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='container'>
                        <div className='row'>
                            <input className='col-12' type='text' placeholder='Title' onChange={e => setText(e.target.value)}/>
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default AddComment;