import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchTop5() {
    try {
        const response = yield axios.get('/api/ingredients/top5/')
        yield put({ type: 'SET_TOP5', payload: response.data });
    } catch (err) {
        console.log('GET ERROR IN TOP5 SAGA', err);
    }
};

function* top5Saga() {
    yield takeLatest('FETCH_TOP5', fetchTop5);
} 


export default top5Saga;