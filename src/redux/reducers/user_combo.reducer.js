const combo = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMBO':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default userCombos;