import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPairings(action) {
    console.log('In fetchPairings Saga');
    try {
        const response = yield axios.get('/api/pairings');
        yield put({type: 'SET_PAIRINGS', payload: response.data});
    } catch (error) {
        console.log('Error on fetchPairings: ', error);
    }
}

function* pairingsSaga() {
    yield takeLatest('FETCH_PAIRINGS', fetchPairings)
}

export default pairingsSaga;