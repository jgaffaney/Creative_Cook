const recipeReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_RECIPES':
            return action.payload
        case 'CLEAR_COMBO_AND_RECIPE':
            return [];
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}; // end recipeReducer

export default recipeReducer;