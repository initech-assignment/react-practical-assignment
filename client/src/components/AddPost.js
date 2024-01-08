import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {MAIN_URL} from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {setPageAction, setTotalAction} from "../redux/actions/gActions";
import tempImage from "../images/temp_image.png";

const AddPost = () => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState();
    const [file, setFile] = useState();
    const userName = useSelector(state => state.userName);
    const total = useSelector(state => state.total);
    const totalPages = useSelector(state => state.totalPages);
    const dispatch = useDispatch();

    const displayImage = (newPicture) => {
        if (newPicture) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const selectedImage = document.getElementById('selectedImage');
                selectedImage.src = e.target.result;
                // selectedImage.style.display = 'block';
            };
            reader.readAsDataURL(newPicture);
        }
    }

    const handleClose = () => setShow(false);
    const handleSave = () => {
        const objTitle = {
            title: title,
            username: userName
        }
        const formData = new FormData();
        formData.append('picture', file)


        fetch(`${MAIN_URL}/post/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(objTitle)
        })
            .then(response => response.json())
            .then(data => {
                fetch(`${MAIN_URL}/post/${data.result.id}/picture/`, {
                    method: 'POST',
                    body: formData
                }).then(resp => resp.json())
                    .then(() => {
                        dispatch(setTotalAction(total+1))
                        dispatch(setPageAction(totalPages));
                    })
                    .catch(e => console.log(`Error: ${e}`))
            })

        setFile({});
        setShow(false);

    }
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button className='btn btn-secondary' variant="primary" onClick={handleShow}>
                Add post
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=' row'>


                        <div className='col-12'>
                            <input style={{ width: '100%', marginBottom: '10px' }} type='text' placeholder='Title'
                                   onChange={e => setTitle(e.target.value)}/>
                        </div>

                        <div className="col-12">
                            <img id="selectedImage" alt={'Preview image'} className='img-fluid rounded-1' src={tempImage}/>
                        </div>
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

export default AddPost;