const goal = (state = [], action) => {
    switch (action.type) {
        case 'SET_GOAL':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default goal;