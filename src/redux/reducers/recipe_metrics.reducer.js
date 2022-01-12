const recipeMetrics = (state = [], action) => {
    switch(action.type) {
        case 'SET_RECIPE_METRICS':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default recipeMetrics;