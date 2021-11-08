import React from 'react';
import './edit-modal.css';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        marginRight: '-50%',
        position: 'absolute',
        width: '50%',
        height: 'auto',
        padding: '50px',
        backgroundColor: '#fff',
        outline: 'none',
        borderRadius: '8px'
    }
};

Modal.setAppElement('#root');

function EditModal({ isOpen, closeModal, post, addPost, editPost, editing }) {

    const [newPost, setNewPost] = useState(post);

    function handleChange(event) {
        setNewPost({ ...newPost, [event.target.name]: event.target.value });
    };

    function removeImage() {
        setNewPost({ ...newPost, image: null });
    }

    function handleInputChange(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
            setNewPost({ ...newPost, image: reader.result });
        };
    }

    useEffect(() => {
        setNewPost(post);
    }, [post]);

    function onSubmitForm() {
        if (editing === true) {
            editPost(newPost);
        } else {
            addPost(newPost);
        }

        closeModal(false);
    }

    return (
        <Modal
            className="modal"
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal" >
            <div>
                {!newPost.image &&
                    <div>
                        <label className="modal-label">
                            <input type="file" name="image" onChange={(e) => handleInputChange(e.target.files[0])} />
                        </label>
                    </div>
                }
                {newPost.image &&
                    <div className="close-image">
                        <span className="btn-close" onClick={removeImage}></span>
                        <img className="close-image__image img-thumbnail" src={newPost.image} alt="" />
                    </div>
                }
                <label className="modal-label">
                    <input type="text" name="title" defaultValue={newPost.title} onChange={handleChange} />
                </label>
                <label className="modal-label">
                    <input type="text" name="text" defaultValue={newPost.text} onChange={handleChange} />
                </label>
                <div className="modal-buttons">
                    <button type="button" className="btn btn-success" onClick={onSubmitForm}>Save</button>
                    <button type="button" className="btn btn-dark" onClick={closeModal}>Close</button>
                </div>
            </div>
        </Modal>
    );
}

export default EditModal;