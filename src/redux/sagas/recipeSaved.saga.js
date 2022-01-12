import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchRecipeSaved() {
    try {
        const response = yield axios.get('/api/goal/recipe')
        // console.log("response.data", response.data);
        yield put({ type: 'SET_RECIPE_SAVED', payload: response.data });
    } catch (err) {
        // console.log('GET ERROR IN RECIPE SAVED SAGA', err);
    }
};

function* recipeSavedSaga() {
    yield takeLatest('FETCH_RECIPE_SAVED', fetchRecipeSaved);
} 


export default recipeSavedSaga;