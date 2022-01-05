const ingredientGoal = (state = [], action) => {
    switch (action.type) {
        case 'SET_INGREDIENT_GOAL':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default ingredientGoal;