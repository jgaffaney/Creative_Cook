import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchRecipes(action){
    console.log('in fetchRecipes action.payload is:', action.payload);
    let firstIngredient = action.payload[0].name;
    let secondIngredient = action.payload[1].name;
    let thirdIngredient = action.payload[2].name;
    console.log('firstIngredient is:', firstIngredient);
    console.log('secondIngredient is:', secondIngredient);
    console.log('thirdIngredient is:', thirdIngredient);
    try {
        // sending the name of all 3 ingredients over in params
        const response = yield axios.get(`/api/recipes?first=${firstIngredient}&second=${secondIngredient}&third=${thirdIngredient}`)
        yield put({ type: 'SET_RECIPES', payload: response.data })
        console.log('response.data', response.data);
    } catch (error) {
        console.log('err in fetchRecipes', error);
    }
} // end fetchRecipes


function* recipeSaga(){
    yield takeLatest('FETCH_RECIPES', fetchRecipes)
} // end recipeSaga

export default recipeSaga;

