import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPairings(action) {

    console.log('In fetchPairings Saga with payload: ', action.payload);
    try {
        const response = yield axios.get(`/api/pairings/${action.payload}`);
        yield put({type: 'SET_PAIRINGS', payload: response.data});
        let unpaired = action.ingredients.map(ingredient => {
            for(let pair of response.data){
                if(pair.name == ingredient.name){
                    return false;
                }
                return ingredient;
            }
        })
        yield put({type: 'SET_UNPAIRED', payload: unpaired})
    } catch (error) {
        console.log('Error on fetchPairings: ', error);
    }
}

function* pairingsSaga() {
    yield takeLatest('FETCH_PAIRINGS', fetchPairings)
}

export default pairingsSaga;