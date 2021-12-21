import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPairings(action) {
    console.log('In fetchPairings Saga with payload: ', action.payload);
    try {
        const response = yield axios.get(`/api/pairings/${action.payload}`);
        yield put({type: 'SET_PAIRINGS', payload: response.data});
    } catch (error) {
        console.log('Error on fetchPairings: ', error);
    }
}

function* pairingsSaga() {
    yield takeLatest('FETCH_PAIRINGS', fetchPairings)
}

export default pairingsSaga;