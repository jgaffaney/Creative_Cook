const ingredientSearch = (state = '', action) => {
    switch(action.type) {
        case 'SET_INGREDIENT_SEARCH':
            return action.payload;
        default:
            return state;
    }
}

export default ingredientSearch;