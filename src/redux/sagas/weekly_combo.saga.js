import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchWeeklyCombos() {
    try {
        const response = yield axios.get('/api/combos/weekly')
        yield put({ type: 'SET_WEEKLY_COMBOS', payload: response.data });
    } catch (err) {
        console.log('GET ERROR IN WEEKLY COMBO SAGA', err);
    }
};

function* weeklyComboSaga() {
    yield takeLatest('FETCH_WEEKLY_COMBOS', fetchWeeklyCombos);
} 


export default weeklyComboSaga;