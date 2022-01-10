const uploadedFile = (state = null, action) => {
    switch(action.type){
        case 'SET_FILE':
            return action.payload
        default:
            return state;
    }
}

export default uploadedFile;

