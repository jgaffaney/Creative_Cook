const seasonsReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_SEASONS':
            return action.payload;
        default:
            return state;
    }
}

export default seasonsReducer;