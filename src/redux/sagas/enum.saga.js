import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchSeasons() {
    console.log('in fetchSeasons');
    
    try {
        const response = yield axios.get('/api/enum/seasons');
        console.log('seasons response: ', response);
        
        yield put({type: 'SET_SEASONS', payload: response.data})
    } catch (error) {
        console.log('Error on fetchSeasons: ', error);
        
    }
}

function* fetchTypes() {
    try {
        const response = yield axios.get('/api/enum/type');
        console.log('type response: ', response);
        yield put({type: 'SET_TYPES', payload: response.data})
    } catch (error) {
        console.log('Error on fetchTypes: ;', error);
        
    }

}

function* enumSaga() {
    yield takeLatest('FETCH_SEASONS', fetchSeasons);
    yield takeLatest('FETCH_TYPES', fetchTypes);
}

export default enumSaga;