const pairingsReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_PAIRINGS':
            return action.payload;
        default:
            return state;
    }
}

export default pairingsReducer;
