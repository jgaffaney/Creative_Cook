const userRecipes = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_RECIPES':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default userRecipes;