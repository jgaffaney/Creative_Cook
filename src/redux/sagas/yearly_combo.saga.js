import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchYearlyCombos() {
    try {
        const response = yield axios.get('/api/combos/yearly')
        yield put({ type: 'SET_YEARLY_COMBOS', payload: response.data });
    } catch (err) {
        console.log('GET ERROR IN YEARLY COMBO SAGA', err);
    }
};

function* yearlyComboSaga() {
    yield takeLatest('FETCH_YEARLY_COMBOS', fetchYearlyCombos);
} 


export default yearlyComboSaga;