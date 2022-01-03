import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchIngredientGoals() {
    try {
        const response = yield axios.get('/api/goal/')
        console.log("response.data[1]", response.data[1]);
        yield put({ type: 'SET_INGREDIENT_GOAL', payload: response.data[1] });
    } catch (err) {
        console.log('GET ERROR IN GOAL SAGA', err);
    }
};

function* updateIngredientGoal(action) {
    console.log('In updateGoal Saga')
    try {
        yield axios.put(`/api/goal`, action.payload);
        yield put({type: 'FETCH_INGREDIENT_GOAL'})
    } catch (error) {
        console.log('Error on updateGoal: ', error);
    }
};

function* ingredientGoalSaga() {
    yield takeLatest('FETCH_INGREDIENT_GOAL', fetchIngredientGoals);
    yield takeLatest('UPDATE_INGREDIENT_GOAL', updateIngredientGoal);
} 


export default ingredientGoalSaga;