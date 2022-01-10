const userIngredients = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_INGREDIENTS':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default userIngredients;