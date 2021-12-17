import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchGoals() {
    try {
        const response = yield axios.get('/api/goal/')
        yield put({ type: 'SET_GOAL', payload: response.data });
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

// function* editIngredient(action) {
//     console.log('In editIngredient Saga with: ', action)
//     try {
//         yield axios.put('/api/ingredients', action.payload);
//         const { seconds, value } = action.payload
//         yield delay(seconds * 1000)
//         yield call(resolvePromiseAction, action, value)
//         yield put({type: 'FETCH_INGREDIENTS'})
//     } catch (error) {
//         console.log('Error on editIngredient: ', error);
//     }


function* goalSaga() {
    yield takeLatest('FETCH_GOAL', fetchGoals);
} 


export default goalSaga;