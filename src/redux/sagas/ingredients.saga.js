import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets all ingredients from DB and sends them to ingredients reducer
function* fetchIngredients() {
    console.log('in fetchIngredients saga');
    try {
        const response = yield axios.get('/api/ingredients');
        console.log('response from GET ingred: ', response);
        
        yield put({type: 'SET_INGREDIENTS', payload: response.data})
    } catch (error) {
        console.log('Error on fetchIngredients: ', error);
    }
}

function* postIngredient(action) {
    console.log('In postIngredient Saga with: ', action);
    try {
        yield axios.post('/api/ingredients', action.payload)
    } catch (error) {
        console.log('Error on postIngredient: ', error);
    }
}

function* ingredientsSaga() {
    yield takeLatest('FETCH_INGREDIENTS', fetchIngredients);
    yield takeLatest('POST_INGREDIENT', postIngredient);
}

export default ingredientsSaga;