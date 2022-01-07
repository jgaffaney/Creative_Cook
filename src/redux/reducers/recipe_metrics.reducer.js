const recipeMetrics = (state = [], action) => {
    switch(action.type) {
        case 'SET_RECIPE_METRICS':
            return action.payload;
        default:
            return state;
    }
}

export default recipeMetrics;