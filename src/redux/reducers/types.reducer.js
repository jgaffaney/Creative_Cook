const typeReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_TYPES':
            let results = []
            for(let index of action.payload){
                results.push(index.unnest)
            }
            // console.log('results in type: ', results);
            
            return results;
        default:
            return state;
    }
}

export default typeReducer;