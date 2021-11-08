import React, { useState, useEffect } from 'react';
import './crud-list.css';
import { connect, useDispatch } from 'react-redux';
import { crudLoaded, deletePost, addNewPost, editPost } from "../../actions/actions"
import CrudService from '../../services/crud-services';
import EditModal from '../modal/edit-modal';
import Spinner from "../spinner/spinner";

const { getCrud } = new CrudService();

const CrudList = ({ crud, crudLoadedFunc, onDelete, dataLoaded }) => {

    const dispatch = useDispatch();

    const [modalIsOpen, setIsOpen] = useState(false);

    const [loading, setLoading] = useState(!dataLoaded);

    const [post, setPost] = useState({});

    const [editing, setEditing] = useState(false);

    function addPost(post) {
        dispatch(addNewPost(post));
    }

    function editPosts(post) {
        dispatch(editPost(post));
    }

    function openModal(post, editing, e) {
        setIsOpen(true);
        setEditing(editing);
        setPost(post);
        e.preventDefault();
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        if (!dataLoaded) {
            getCrud().then((crudData) => {
                crudLoadedFunc(crudData.data);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div className="container">
            {loading &&
                <Spinner />
            }
            {!loading &&
                <div className="crud-list row">
                    <button
                        className="btn btn-primary"
                        onClick={(e) => openModal({}, false, e)}>
                        Add New Post
                    </button>
                    {
                        crud.map((post) => {
                            return (
                                <div key={post.id} className="col crud-list-item">
                                    <div className="crud-list-item-img">
                                        <img className="img-thumbnail" src={post.image} alt="" />
                                    </div>
                                    <p className="crud-list-item__text">{post.title}</p>
                                    <p className="crud-list-item__text">{post.text}</p>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => onDelete(post.id)} >
                                        Delete Post
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={(e) => openModal(post, true, e)} >
                                        Edit Post
                                </button>
                                </div>
                            )
                        })
                    }
                    <EditModal isOpen={modalIsOpen} closeModal={closeModal} addPost={addPost} editPost={editPosts} post={post} editing={editing} />
                </div>
            }
        </div>
    );
}

const mapStateToProps = ({ crud, dataLoaded }) => {
    return { crud, dataLoaded };
};

const mapDispatchToProps = {
    crudLoadedFunc: crudLoaded,
    onDelete: deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CrudList);