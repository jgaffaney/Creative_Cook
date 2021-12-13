const recipeReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_RECIPES':
            return action.payload
        default:
            return state;
    }
}; // end recipeReducer

export default recipeReducer;