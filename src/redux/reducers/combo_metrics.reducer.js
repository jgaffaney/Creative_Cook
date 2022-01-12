const comboMetrics = (state = [], action) => {
    switch(action.type) {
        case 'SET_COMBO_METRICS':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default comboMetrics;