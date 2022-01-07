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

function* resetComboGoal(action) {
    console.log('In resetComboGoal Saga')
    try {
        yield axios.put(`/api/goal/reset`, action.payload);
        yield put({type: 'FETCH_COMBO_GOAL'})
    } catch (error) {
        console.log('Error on resetComboGoal: ', error);
    }
}

function* comboGoalSaga() {
    yield takeLatest('FETCH_COMBO_GOAL', fetchComboGoals);
    yield takeLatest('UPDATE_COMBO_GOAL', updateComboGoal);
    yield takeLatest('RESET_COMBO_GOAL', resetComboGoal);
} 


export default comboGoalSaga;