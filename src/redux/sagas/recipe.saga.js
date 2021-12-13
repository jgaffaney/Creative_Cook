import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* recipeSaga(){
    yield takeLatest('FETCH_RECIPES', fetchRecipes)
} // end recipeSaga

function* fetchRecipes(){
    try {
        const response = yield axios.get('/api/recipes')
        yield put({ type: 'SET_RECIPES', payload: response.data })
        console.log('response.data', response.data);
    } catch (error) {
        console.log('err in fetchRecipes', error);
    }
} // end fetchRecipes

export default recipeSaga;

