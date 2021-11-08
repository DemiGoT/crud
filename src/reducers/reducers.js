const initialState = {
    crud: [],
    dataLoaded: false,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CRUD_LOADED':
            return {
                ...state,
                crud: action.payload,
                dataLoaded: true,
            };

        case 'DELETE_POST':
            const crudId = action.payload;
            const crudIndex = state.crud.findIndex(({ id }) => id === crudId);

            return {
                ...state,
                crud: [...state.crud.slice(0, crudIndex), ...state.crud.slice(crudIndex + 1)],
            };

        case 'EDIT_POST':
            const editedPost = state.crud.map(element => {
                if (element.id === action.payload.id) {
                    return action.payload;
                }
                return element;
            });

            return {
                ...state,
                crud: editedPost
            }

        case 'ADD_NEW_POST':
            const newPost = state.crud;
            newPost.unshift(
                {
                    ...action.payload,
                    id: state.crud[state.crud.length - 1].id + 1
                }
            );

            return {
                ...state,
                crud: newPost,
            }

        default:
            return state;
    }
};

export default reducer;
