import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// fetching recipes from API based on 2-3 selected ingredients
function* fetchRecipes(action) {
    console.log('in fetchRecipes action.payload is:', action.payload);
    // we know we will always have 2 ingredients, so assigning them here
    let firstIngredient = action.payload[0].name;
    let secondIngredient = action.payload[1].name;
    // third ingredient is declared but not assigned
    let thirdIngredient;
    // if there is a 3rd ingredient, assign it. If not make it an empty string.
    (action.payload[2] ? thirdIngredient = action.payload[2].name : thirdIngredient = '')
    try {
        // sending the name of all 3 ingredients over in params
        const response = yield axios.get(`/api/recipes?first=${firstIngredient}&second=${secondIngredient}&third=${thirdIngredient}`)
        // console.log('response.data.hits is !!! ', response.data.hits);
        yield put({ type: 'SET_RECIPES', payload: response.data.hits })
        console.log('response.data', response.data);
    } catch (error) {
        console.log('err in fetchRecipes', error);
    }
} // end fetchRecipes

// user saves recipe from API
function* saveUserRecipe(action) {
    console.log('in saveUserRecipe saga', action.payload);
    try {
        yield axios.post(`/api/recipes/user`, action.payload);
    } catch (error) {
        console.log('error in userSaveRecipe', error);
    }
}


function* recipeSaga() {
    yield takeLatest('FETCH_RECIPES', fetchRecipes)
    yield takeLatest('SAVE_USER_RECIPE', saveUserRecipe)
} // end recipeSaga

export default recipeSaga;

