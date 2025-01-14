import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {MAIN_URL} from "../utils/constants";


const EditComment = ({setCurrentComment, comment}) => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState(comment.text);


    const handleClose = () => setShow(false);
    const handleSave = () => {
        const commentObj = {
            text: text,
            likes: comment.likes,
            dislikes: comment.dislikes
        };

        fetch(`${MAIN_URL}/comment/${comment.id}/`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(commentObj)
        })
            .then(resp => resp.json())
            .then(data => {
                setCurrentComment(data.result);
            }).catch(e => console.log(`Can't save comment to backend: ${e}`))
        setShow(false);
    }
    const handleShow = () => setShow(true);
    return (
        <div>
            <a className="text-decoration-underline mx-1 col-1" role='button' onClick={handleShow}>Edit</a>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='container'>
                        <div className='row'>
                            <input className='col-12' type='text' placeholder='Title' value={text}
                                   onChange={e => setText(e.target.value)}/>
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

export default EditComment;