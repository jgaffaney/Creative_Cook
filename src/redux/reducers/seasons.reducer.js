const seasonsReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_SEASONS':
            let results = [];
            for(let index of action.payload) {
                results.push(index.unnest)
            }
            return results;
        default:
            return state;
    }
}

export default seasonsReducer;