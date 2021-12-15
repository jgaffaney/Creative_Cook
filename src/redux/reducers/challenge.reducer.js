const challenge = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHALLENGE':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default challenge;