const recipeSaved = (state = [], action) => {
    switch (action.type) {
        case 'SET_RECIPE_SAVED':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default recipeSaved;