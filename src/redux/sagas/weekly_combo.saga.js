import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchWeeklyCombos() {
    try {
        const response = yield axios.get('/api/combo/weekly')
        console.log("response.data", response.data);
        yield put({ type: 'SET_WEEKLY_COMBO', payload: response.data });
    } catch (err) {
        console.log('GET ERROR IN WEEKLY COMBO SAGA', err);
    }
};

function* weeklyComboSaga() {
    yield takeLatest('FETCH_WEEKLY_COMBOS', fetchWeeklyCombos);
} 


export default weeklyComboSaga;