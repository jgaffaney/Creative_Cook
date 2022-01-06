const monthlyCombos = (state = [], action) => {
    switch(action.type) {
        case 'SET_MONTHLY_COMBOS':
            return action.payload;
        default:
            return state;
    }
}

export default monthlyCombos;