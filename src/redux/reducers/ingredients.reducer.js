const ingredientsReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_INGREDIENTS':
            return action.payload
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default ingredientsReducer;