import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchRecipeGoals() {
    try {
        const response = yield axios.get('/api/goal/')
        console.log("response.data[1]", response.data[1]);
        yield put({ type: 'SET_RECIPE_GOAL', payload: response.data[1] });
    } catch (err) {
        console.log('GET ERROR IN GOAL SAGA', err);
    }
};

function* updateRecipeGoal(action) {
    console.log('In updateRecipeGoal Saga')
    try {
        yield axios.put(`/api/goal`, action.payload);
        yield put({type: 'FETCH_RECIPE_GOAL'})
    } catch (error) {
        console.log('Error on updateRecipeGoal: ', error);
    }
};

function* resetRecipeGoal(action) {
    console.log('In resetRecipeGoal Saga')
    try {
        yield axios.put(`/api/goal/reset`, action.payload);
        yield put({type: 'FETCH_RECIPE_GOAL'})
    } catch (error) {
        console.log('Error on resetRecipeGoal: ', error);
    }
};


function* recipeGoalSaga() {
    yield takeLatest('FETCH_RECIPE_GOAL', fetchRecipeGoals);
    yield takeLatest('UPDATE_RECIPE_GOAL', updateRecipeGoal);
    yield takeLatest('RESET_RECIPE_GOAL', resetRecipeGoal);
} 


export default recipeGoalSaga;