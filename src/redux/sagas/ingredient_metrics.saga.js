import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchIngredientMetrics() {
    try {
        const response = yield axios.get('/api/ingredients/metrics')
        yield put({ type: 'SET_INGREDIENT_METRICS', payload: response.data });
    } catch (err) {
        console.log('GET ERROR IN INGREDIENT METRICS SAGA', err);
    }
};

function* ingredientMetricsSaga() {
    yield takeLatest('FETCH_INGREDIENT_METRICS', fetchIngredientMetrics);
} 


export default ingredientMetricsSaga;