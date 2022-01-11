import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchChallenges() {
    try {
        const response = yield axios.get('/api/challenge/')
        yield put({ type: 'SET_CHALLENGE', payload: response.data });
    } catch (err) {
        // console.log('GET ERROR in fetchChallenges SAGA', err);
    }
};

//saga POST to server
function* addChallenge(action) {
    try {
        yield axios.post('/api/challenge/', action.payload)
        yield put({ type: 'FETCH_CHALLENGE' })
    } catch (err) {
        // console.log('POST ERROR in addChallenge SAGA', err);
    }
};

// saga DELETE to server
function* removeChallenge(action) {
    const removeId = action.payload
    // console.log('removeId', removeId);
    
    try {
        yield axios.delete(`/api/challenge/${removeId}`)
        // dispatch refresh of the feed list
        yield put({ type: 'FETCH_CHALLENGE'})
    } catch (err) {
        // console.log('DELETE ERROR removeChallenge SAGA', err);
    }

}


function* challengeSaga() {
    yield takeLatest('FETCH_CHALLENGE', fetchChallenges);
    yield takeLatest('ADD_CHALLENGE', addChallenge);
    yield takeLatest('REMOVE_FEED_ITEM', removeChallenge);
} 


export default challengeSaga;