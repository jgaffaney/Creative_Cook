const comboSnackbarReducer = (state = false, action) => {
    switch(action.type){
        case 'SET_SHOW_COMBO_SNACKBAR':
            return true;
        case 'SET_HIDDEN_SNACKBAR':
            return false;
        case 'LOGOUT':
            return false;
        default: 
            return state;
    }
}

export default comboSnackbarReducer