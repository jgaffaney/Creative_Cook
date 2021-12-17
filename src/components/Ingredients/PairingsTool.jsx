import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IngredientAutocomplete from '../IngredientAutocomplete/IngredientAutocomplete';
import { sxSearchContainer } from '../Home/Home.style';

const PairingsTool = () => {

    const dispatch = useDispatch();

    const pairings = useSelector(store => store.pairings);

    const [newPairings, setNewPairings] = useState();


    useEffect(() => {
        dispatch({ type: 'FETCH_PAIRINGS' })
    })
    return (
        <>
            <h1>Pairings Tool</h1>
            <Box sx={sxSearchContainer}>
                <IngredientAutocomplete />
                <Button variant='contained' >Search</Button>
            </Box>
        </>

    )
}

export default PairingsTool;