import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchCombos() {
    try {
        const response = yield axios.get('/api/combos/')
        yield put({ type: 'SET_COMBO', payload: response.data });
    } catch (err) {
        // console.log('GET ERROR IN COMBO SAGA', err);
    }
} // end fetchCombos

function* saveCombo(action) {
    try {
       yield axios.post(`/api/combos`, action.payload)
       yield put({ type: 'FETCH_COMBOS' });
       yield put ({ type: 'SET_SHOW_COMBO_SNACKBAR' })
    } catch (error) {
        // console.log('error in saveCombo', error);
    }
} // end saveCombo

function* comboSaga() {
    yield takeLatest('FETCH_COMBOS', fetchCombos);
    yield takeLatest('SAVE_NEW_COMBO', saveCombo)
} // end comboSaga


export default comboSaga;