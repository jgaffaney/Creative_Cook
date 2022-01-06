import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchMonthlyCombos() {
    try {
        const response = yield axios.get('/api/combos/monthly')
        yield put({ type: 'SET_MONTHLY_COMBOS', payload: response.data });
    } catch (err) {
        console.log('GET ERROR IN MONTHLY COMBO SAGA', err);
    }
};

function* monthlyComboSaga() {
    yield takeLatest('FETCH_MONTHLY_COMBOS', fetchMonthlyCombos);
} 


export default monthlyComboSaga;