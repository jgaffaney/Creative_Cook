const comboPairingTwoReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_INGREDIENT_TWO_PAIRINGS':
            return action.payload;
        default:
            return state;
    }
}

export default pairingsReducer;
