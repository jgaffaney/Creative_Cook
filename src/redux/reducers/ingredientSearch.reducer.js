const ingredientSearch = (state = '', action) => {
    switch(action.type) {
        case 'SET_INGREDIENT_SEARCH':
            return action.payload;
        case 'LOGOUT':
            return '';
        default:
            return state;
    }
}

export default ingredientSearch;