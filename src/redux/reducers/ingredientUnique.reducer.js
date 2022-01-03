const ingredientUnique = (state = [], action) => {
    switch (action.type) {
        case 'SET_INGREDIENT_UNIQUE':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default ingredientUnique;