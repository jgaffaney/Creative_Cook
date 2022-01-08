const comboGoal = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMBO_GOAL':
            return [...state, action.payload];
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default comboGoal;