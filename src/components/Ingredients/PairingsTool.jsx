import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const PairingsTool = () => {

    const dispatch = useDispatch();

    const pairings = useSelector(store => store.pairings);
    
    const [newPairings, setNewPairings] = useState();


    useEffect(() => {
        dispatch({type: 'FETCH_PAIRINGS'})
    })
    return( 
        <h1>Pairings Tool</h1>
    )
}

export default PairingsTool;