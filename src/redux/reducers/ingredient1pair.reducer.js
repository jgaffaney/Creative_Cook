const comboPairingOneReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_INGREDIENT_ONE_PAIRINGS':
            return action.payload;
        default:
            return state;
    }
}

export default pairingsReducer;
