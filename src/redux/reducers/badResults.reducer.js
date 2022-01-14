const badResults = (state = null, action) => {
    switch(action.type) {
        case 'SET_BAD_RESULTS':
            return action.payload;
        default:
            return state
    }
}

export default badResults;