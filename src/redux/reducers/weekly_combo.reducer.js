const weeklyCombos = (state = [], action) => {
    switch(action.type) {
        case 'SET_WEEKLY_COMBOS':
            return action.payload;
        default:
            return state;
    }
}

export default weeklyCombos;