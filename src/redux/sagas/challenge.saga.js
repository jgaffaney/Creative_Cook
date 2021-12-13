import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchChallenges() {
    try {
        const response = yield axios.get('/api/challenge')
        yield put({ type: 'SET_CHALLENGE', payload: response.data });
    } catch (err) {
        console.log('GET ERROR IN CHALLENGE SAGA', err);
    }
};

//saga POST to server
function* addChallenge(action) {
    try {
        yield axios.post('/api/challenge', action.payload)
        yield put({ type: 'FETCH_CHALLENGE' })
    } catch (err) {
        console.log('POST ERROR IN CHALLENGE SAGA', err);
    }
};

function* challengeSaga() {
    yield takeLatest('FETCH_CHALLENGE', fetchChallenges);
    yield takeLatest('ADD_CHALLENGE', addChallenge);
} 


export default challengeSaga;