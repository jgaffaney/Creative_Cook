const combo = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMBO_INGREDIENT':
            if (state.length < 3) {
                state = state.filter(ingredient => ingredient.id !== action.payload.id)
                return [...state, action.payload]
            } else {
                return state;
            }
        case 'CLEAR_COMBO_AND_RECIPE':
            return [];
        default:
            return state;
    }
} // end ingredientSelect

export default combo;
