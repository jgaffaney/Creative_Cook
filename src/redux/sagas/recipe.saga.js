import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// fetching recipes from API based on 2-3 selected ingredients
function* fetchRecipes(action) {
    // console.log('in fetchRecipes action.payload is:', action.payload);
    // we know we will always have 2 ingredients, so assigning them here
    let firstIngredient = action.payload.combo[0].name;
    let secondIngredient = action.payload.combo[1].name;
    // third ingredient is declared but not assigned
    let thirdIngredient;
    let health;
    // console.log('firstIngredient: ', firstIngredient);
    // console.log('secondIngredient: ', secondIngredient);
    // if there is a 3rd ingredient, assign it. If not make it an empty string.
    (action.payload.combo[2] ? thirdIngredient = action.payload.combo[2].name : thirdIngredient = '');
    // console.log('thirdIngredient is:', thirdIngredient);
    // if there is a healthFilter requested assign it to the URL, otherwise leave it empty
    (action.payload.filter.length > 0 ? health = `${action.payload.filter}` : health = '');
    // console.log('health is:', health);
    try {
        yield put({ type: 'SET_HEALTH_FILTER', payload: health })
        // sending the name of all 3 ingredients over in params
        const response = yield axios.get(`/api/recipes?first=${firstIngredient}&second=${secondIngredient}&third=${thirdIngredient}&health=${health}`)
        // console.log('response.data.hits is !!! ', response.data.hits);
        yield put({ type: 'SET_RECIPES', payload: response.data.hits })
        // console.log('response.data', response.data);
    } catch (error) {
        console.log('err in fetchRecipes', error);
    }
} // end fetchRecipes

// user saves recipe from API
function* saveUserRecipe(action) {
    // console.log('in saveUserRecipe saga', action.payload);
    try {
        yield axios.post(`/api/recipes/user`, action.payload);
        yield put({ type: 'SET_SHOW_RECIPE_SNACKBAR' })
    } catch (error) {
        // console.log('error in userSaveRecipe', error);
    }
}


function* recipeSaga() {
    yield takeLatest('FETCH_RECIPES', fetchRecipes)
    yield takeLatest('SAVE_USER_RECIPE', saveUserRecipe)
} // end recipeSaga

export default recipeSaga;

