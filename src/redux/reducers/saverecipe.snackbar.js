const recipeSnackbarReducer = (state = false, action) => {
    switch(action.type){
        case 'SET_SHOW_RECIPE_SNACKBAR':
            return true;
        case 'SET_HIDDEN_SNACKBAR':
            return false;
        default: 
            return state;
    }
}

export default recipeSnackbarReducer