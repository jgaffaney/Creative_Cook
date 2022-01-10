const comboPairingOneReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_INGREDIENT_ONE_PAIRINGS':
            return action.payload;
        case 'CLEAR_COMBO_AND_RECIPE':
            return [];
        default:
            return state;
    }
}

export default comboPairingOneReducer;
