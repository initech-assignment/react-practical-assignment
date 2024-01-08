import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {MAIN_URL} from "../utils/constants";


const EditPost = ({currentPost, setCurrentPost}) => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(currentPost.title);
    const [file, setFile] = useState();

    useEffect(() => {
        setTitle(currentPost.title);
    }, [currentPost]);


    const displayImage = (newPicture) => {
        if (newPicture) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const selectedImage = document.getElementById('selectedImage');
                selectedImage.src = e.target.result;
                selectedImage.style.display = 'block';
            };
            reader.readAsDataURL(newPicture);
        }
    }


    const handleClose = () => setShow(false);
    const handleSave = () => {
        const postObj = {
            title: title
        }
        if(file) {
            const formData = new FormData();
            formData.append('picture', file);

            fetch(`${MAIN_URL}/post/${currentPost.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(postObj)
            }).then(resp => resp.json())
                .then(data => {
                    fetch(`${MAIN_URL}/post/${data.result.id}/picture/`, {
                        method: 'POST',
                        body: formData
                    }).then(resp => resp.json())
                        .then(data => {
                            setCurrentPost(data.result)
                        }).catch(e => console.log(`Can't save post to backend: ${e}`))
                }).catch(e => console.log(`Can't save post to backend: ${e}`))
        }else{
            fetch(`${MAIN_URL}/post/${currentPost.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(postObj)
            }).then(resp => resp.json())
                .then(data => {
                    setCurrentPost(prevPost => ({...prevPost, title: data.result.title}))
                }).catch(e => console.log(`Can't save post to backend: ${e}`))
        }
        setShow(false);
    }
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button style={{fontSize: '10px', padding: '1px'}} className='btn' variant='link' onClick={handleShow}>
                Edit post
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=' row'>


                        <div className='col-12'>
                            <input style={{ width: '100%', marginBottom: '10px' }} type='text' placeholder='Title' value={title}
                                   onChange={e => setTitle(e.target.value)}/>
                        </div>

                        <div className="col-12"><img id="selectedImage" alt={'Preview image'} className='img-fluid rounded-1'
                                                     src={currentPost.imageSrc}/></div>
                        <div className='col-12'>
                            Image:
                        </div>


                        <div className='row col-12'>
                            <input className='float-start' type='file' onChange={e => {
                                displayImage(e.target.files[0])
                                setFile(e.target.files[0])}}/>
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

export default EditPost;