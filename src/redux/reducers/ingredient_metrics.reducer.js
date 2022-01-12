const ingredientMetrics = (state = [], action) => {
    switch(action.type) {
        case 'SET_INGREDIENT_METRICS':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default ingredientMetrics;