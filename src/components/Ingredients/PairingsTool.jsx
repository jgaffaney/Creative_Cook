import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';


const PairingsTool = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_PAIRINGS'})
    })
    return( 
        <h1>Pairings Tool</h1>
    )
}

export default PairingsTool;