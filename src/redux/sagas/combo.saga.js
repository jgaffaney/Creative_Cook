import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchCombos() {
    try {
        const response = yield axios.get('/api/combos/')
        yield put({ type: 'SET_COMBO', payload: response.data });
    } catch (err) {
        console.log('GET ERROR IN COMBO SAGA', err);
    }
};

function* comboSaga() {
    yield takeLatest('FETCH_COMBOS', fetchCombos);
} 


export default comboSaga;