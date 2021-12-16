import axios from 'axios';
import { call, put, delay, takeLatest } from 'redux-saga/effects';
// import { promises as fsPromises } from 'fs'
import { resolvePromiseAction } from '@adobe/redux-saga-promise'

// gets all ingredients from DB and sends them to ingredients reducer
function* fetchIngredients() {
    console.log('in fetchIngredients saga');
    try {
        const response = yield axios.get('/api/ingredients');
        console.log('response from GET ingred: ', response);

        yield put({ type: 'SET_INGREDIENTS', payload: response.data })
    } catch (error) {
        console.log('Error on fetchIngredients: ', error);
    }
}

function* postIngredient(action) {
    console.log('In postIngredient Saga with: ', action);
    try {
        yield axios.post('/api/ingredients', action.payload)
        yield put({ type: 'FETCH_INGREDIENTS' });
    } catch (error) {
        console.log('Error on postIngredient: ', error);
    }
}

function* editIngredient(action) {
    console.log('In editIngredient Saga with: ', action)
    try {
        yield axios.put('/api/ingredients', action.payload);
        const { seconds, value } = action.payload
        yield delay(seconds * 1000)
        yield call(resolvePromiseAction, action, value)
        yield put({type: 'FETCH_INGREDIENTS'})
    } catch (error) {
        console.log('Error on editIngredient: ', error);
    }

}

function* ingredientsSaga() {
    yield takeLatest('FETCH_INGREDIENTS', fetchIngredients);
    yield takeLatest('POST_INGREDIENT', postIngredient);
    yield takeLatest('EDIT_INGREDIENT.TRIGGER', editIngredient)
}

export default ingredientsSaga;