import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchRecipeMetrics() {
    try {
        const response = yield axios.get('/api/recipes/metrics')
        yield put({ type: 'SET_RECIPE_METRICS', payload: response.data });
    } catch (err) {
        // console.log('GET ERROR IN RECIPE METRICS SAGA', err);
    }
};

function* recipeMetricsSaga() {
    yield takeLatest('FETCH_RECIPE_METRICS', fetchRecipeMetrics);
} 


export default recipeMetricsSaga;