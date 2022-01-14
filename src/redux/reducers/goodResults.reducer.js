const resultsReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_RESULTS':
            return action.payload;
        default:
            return state
    }
}

export default resultsReducer;