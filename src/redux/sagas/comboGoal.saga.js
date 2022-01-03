import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchComboGoals() {
    try {
        const response = yield axios.get('/api/goal/')
        console.log("response.data[2]", response.data[2]);
        yield put({ type: 'SET_COMBO_GOAL', payload: response.data[2] });
    } catch (err) {
        console.log('GET ERROR IN GOAL SAGA', err);
    }
};

function* updateComboGoal(action) {
    console.log('In updateGoal Saga')
    try {
        yield axios.put(`/api/goal`, action.payload);
        yield put({type: 'FETCH_COMBO_GOAL'})
    } catch (error) {
        console.log('Error on updateGoal: ', error);
    }
};

function* comboGoalSaga() {
    yield takeLatest('FETCH_COMBO_GOAL', fetchComboGoals);
    yield takeLatest('UPDATE_COMBO_GOAL', updateComboGoal);
} 


export default comboGoalSaga;