const { takeLatest } = require("redux-saga/effects");


function* filterIngredients(action) {
    console.log('In filterIngredients Saga with: ', action);
    try {
        
    } catch (error) {
        
    }
}

function* filteredIngredientsSaga() {
    // yield takeLatest('FILTER_INGREDIENTS', filterIngredients)
}

export default filteredIngredientsSaga;