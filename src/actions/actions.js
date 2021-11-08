const crudLoaded = (newCrud) => {
    return {
        type: 'CRUD_LOADED',
        payload: newCrud
    };
};

const deletePost = (postId) => {
    return {
        type: "DELETE_POST",
        payload: postId
    }
}

const editPost = (post) => {
    return {
        type: "EDIT_POST",
        payload: post
    }
}

const addNewPost = (post) => {
    return {
        type: "ADD_NEW_POST",
        payload: post
    }
}

export {
    crudLoaded,
    deletePost,
    editPost,
    addNewPost
};
