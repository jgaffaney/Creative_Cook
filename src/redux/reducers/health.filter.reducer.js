
const healthFilterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_HEALTH_FILTER':
            return action.payload;
        case 'LOGOUT':
            return '';
        default:
            return state;
    }
};

export default healthFilterReducer;