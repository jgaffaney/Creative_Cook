const yearlyCombos = (state = [], action) => {
    switch(action.type) {
        case 'SET_YEARLY_COMBOS':
            return action.payload;
        default:
            return state;
    }
}

export default yearlyCombos;