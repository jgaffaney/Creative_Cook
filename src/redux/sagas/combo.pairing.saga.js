import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchIngredientOnePairings(action) {
    console.log('In fetchIngredientOnePairings Saga with payload: ', action.payload);
    try {
        const response = yield axios.get(`/api/combos/pairings/${action.payload}`);
        yield put({type: 'SET_INGREDIENT_ONE_PAIRINGS', payload: response.data});
    } catch (error) {
        console.log('Error on fetchPairings: ', error);
    }
}

function* fetchIngredientTwoPairings(action) {

    console.log('In fetchIngredientTwoPairings Saga with payload: ', action.payload);
    try {
        const response = yield axios.get(`/api/combos/pairings/${action.payload}`);
        yield put({type: 'SET_INGREDIENT_TWO_PAIRINGS', payload: response.data});
    } catch (error) {
        console.log('Error on fetchPairings: ', error);
    }
}

function* comboPairingSaga() {
    yield takeLatest('FETCH_INGREDIENT_ONE_PAIRINGS', fetchIngredientOnePairings)
    yield takeLatest('FETCH_INGREDIENT_TWO_PAIRINGS', fetchIngredientTwoPairings)
}

export default comboPairingSaga;