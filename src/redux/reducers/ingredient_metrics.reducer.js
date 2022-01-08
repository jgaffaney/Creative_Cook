const ingredientMetrics = (state = [], action) => {
    switch(action.type) {
        case 'SET_INGREDIENT_METRICS':
            return action.payload;
        default:
            return state;
    }
}

export default ingredientMetrics;