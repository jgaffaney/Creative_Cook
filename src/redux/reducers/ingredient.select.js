const ingredientSelect = (state = [], action) => {
    switch(action.type){
        case 'SET_SELECTED_INGREDIENT':
            return [...state, action.payload];
        default:
            return state;
    }
} // end ingredientSelect

export default ingredientSelect