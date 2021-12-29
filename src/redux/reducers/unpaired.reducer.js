const unpairedReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_UNPAIRED':
            return action.payload
        default:
            return state;
    }
}

export default unpairedReducer;