import { breakpoints } from '@mui/system';
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPairings(action) {

    // console.log('In fetchPairings Saga with payload: ', action.payload);
    try {
        const response = yield axios.get(`/api/pairings/${action.payload}`);
        yield put({type: 'SET_PAIRINGS', payload: response.data});
        const unpaired = action.ingredients.filter(ingredient => {
            return !response.data.some(pair => ingredient.name.toLowerCase() === pair.name.toLowerCase())
            })
        // let unpaired = [];
        // for(let ingredient of action.ingredients){
        //     for(let pair of response.data){
        //         console.log('pair.name.toLowerCase: ', pair.name.toLowerCase());
        //         console.log('action.ingredient: ', ingredient.name.toLowerCase());
                
        //         if(pair.name.toLowerCase() == ingredient.name.toLowerCase()){
        //             break;
        //         } 
        //         unpaired.push(ingredient)            
        //     }
        // }    
        yield put({type: 'SET_UNPAIRED', payload: unpaired})
    } catch (error) {
        // console.log('Error on fetchPairings: ', error);
    }
}

function* addNewPairing(action) {
    try {
        yield axios.post(`/api/pairings/${action.payload}`, {pair: action.pairWith});
        yield put({type: 'FETCH_PAIRINGS', payload: action.pairWith, ingredients: action.ingredients})
    } catch (error) {
        // console.log('Error on addNewPairing: ', error);
    }
}

function* deletePairing(action) {
    try{
        // console.log('unPair in deletePairingSage: ', action.pairWith);
        
        yield axios.delete(`/api/pairings/`, {data: {pair: action.pairWith, del: action.payload}});
        yield put({type: 'FETCH_PAIRINGS', payload: action.pairWith, ingredients: action.ingredients})
    } catch (err) {
        // console.log('Error on removePairing: ', err);
    }
}

function* postBulkPairing(action) {
    // console.log('in postBulkPairing Saga with payload: ', action.payload);

    const formData = new FormData();
    formData.append('file', action.payload);
    try {
        yield axios.post('/api/bulkPairings/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }});
    } catch (error) {
        // console.log('Error in postBulkPairing: ', error);
    }
    
}

function* pairingsSaga() {
    yield takeLatest('FETCH_PAIRINGS', fetchPairings)
    yield takeLatest('ADD_PAIRING', addNewPairing)
    yield takeLatest('DELETE_PAIRING', deletePairing)
    yield takeLatest('POST_PAIRINGS_FILE', postBulkPairing)
}

export default pairingsSaga;