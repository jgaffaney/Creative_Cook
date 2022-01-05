const recipeGoal = (state = [], action) => {
    switch (action.type) {
        case 'SET_RECIPE_GOAL':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default recipeGoal;