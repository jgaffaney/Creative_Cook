import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets all ingredients from DB and sends them to ingredients reducer
function* fetchIngredients() {
    try {
        const response = yield axios.get('api/ingredients');
        yield put({type: 'SET_INGREDIENTS', payload: response.data})
    } catch (error) {
        console.log('Error on fetchIngredients: ', error);
    }
}

function* ingredientsSaga() {
    yield takeLatest('FETCH_INGREDIENTS', fetchIngredients)
}

export default ingredientsSaga;