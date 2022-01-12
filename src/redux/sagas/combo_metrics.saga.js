import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchComboMetrics() {
    try {
        const response = yield axios.get('/api/combos/metrics')
        yield put({ type: 'SET_COMBO_METRICS', payload: response.data });
    } catch (err) {
        // console.log('GET ERROR IN COMBO METRICS SAGA', err);
    }
};

function* comboMetricsSaga() {
    yield takeLatest('FETCH_COMBO_METRICS', fetchComboMetrics);
} 


export default comboMetricsSaga;