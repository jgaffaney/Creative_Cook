import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchIngredientUnique() {
    try {
        const response = yield axios.get('/api/goal/ingredient')
        console.log("response.data", response.data);
        yield put({ type: 'SET_INGREDIENT_UNIQUE', payload: response.data });
    } catch (err) {
        console.log('GET ERROR IN INGREDIENT UNIQUE SAGA', err);
    }
};

function* ingredientUniqueSaga() {
    yield takeLatest('FETCH_INGREDIENT_UNIQUE', fetchIngredientUnique);
} 


export default ingredientUniqueSaga;