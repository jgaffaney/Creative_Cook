import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchGoals() {
    try {
        const response = yield axios.get('/api/goal/')
        yield put({ type: 'SET_GOAL', payload: response.data[0] });
    } catch (err) {
        console.log('GET ERROR IN GOAL SAGA', err);
    }
};

// //saga POST to server
// function* addChallenge(action) {
//     try {
//         yield axios.post('/api/challenge/', action.payload)
//         yield put({ type: 'FETCH_CHALLENGE' })
//     } catch (err) {
//         console.log('POST ERROR IN CHALLENGE SAGA', err);
//     }
// };

function* updateGoal(action) {
    console.log('In updateGoal Saga')
    try {
        yield axios.put(`/api/goal`, action.payload);
        yield put({type: 'FETCH_GOAL'})
    } catch (error) {
        console.log('Error on updateGoal: ', error);
    }
};

function* goalSaga() {
    yield takeLatest('FETCH_GOAL', fetchGoals);
    yield takeLatest('UPDATE_GOAL', updateGoal);
} 


export default goalSaga;