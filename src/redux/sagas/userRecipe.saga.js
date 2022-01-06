import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchUserRecipes() {
    try {
        const response = yield axios.get('/api/recipes/userRecipes/')
        yield put({ type: 'SET_USER_RECIPES', payload: response.data });
    } catch (err) {
        console.log('GET ERROR IN USER RECIPES SAGA', err);
    }
};

function* userRecipesSaga() {
    yield takeLatest('FETCH_USER_RECIPES', fetchUserRecipes);
} 


export default userRecipesSaga;