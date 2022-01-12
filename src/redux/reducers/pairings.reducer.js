const pairingsReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_PAIRINGS':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default pairingsReducer;
