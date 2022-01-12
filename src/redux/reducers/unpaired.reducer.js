const unpairedReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_UNPAIRED':
            return action.payload
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default unpairedReducer;