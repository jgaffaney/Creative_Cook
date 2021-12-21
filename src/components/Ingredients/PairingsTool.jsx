import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IngredientAutocomplete from '../IngredientAutocomplete/IngredientAutocomplete';
import { sxSearchContainer } from '../Home/Home.style';

const PairingsTool = () => {

    const dispatch = useDispatch();

    const pairings = useSelector(store => store.pairings);
    const searchText = useSelector(store=>store.ingredientSearch);
    const ingredients = useSelector(store=>store.ingredients);

    const [newPairings, setNewPairings] = useState();

    const handleSetIngredient = () => {
        console.log('Submit clicked with id: ', searchText);
        let id = 0;

        // convert searchText to an ingredient id from DB query
        for(let ingredient of ingredients) {
            if(ingredient.name === searchText){
                id = ingredient.id;
            }
        }
        console.log('Converted name to id yields id: ', id);
        dispatch({type: 'FETCH_PAIRINGS', payload: id})

    }

    const columns = [
        {field: 'id', headerName: 'Id', hide: true},
        { field: 'name', headerName: 'Name'},
        { field: 'description', headerName: 'Description'},
        { field: 'taste', headerName: 'Taste'},
        { field: 'season', headerName: 'Season'},
        { field: 'weight', headerName: 'Weight'},
        { field: 'volume', headerName: 'Volume'},
        { field: 'type', headerName: 'Type'},

    ]

    // useEffect(() => {
    //     dispatch({ type: 'FETCH_PAIRINGS' })
    // }, [])
    return (
        <>
            <h1>Pairings Tool</h1>
            <Box sx={sxSearchContainer}>
                <IngredientAutocomplete />
                <Button onClick={handleSetIngredient}variant='contained' >Search</Button>
            <DataGrid
                rows={pairings}
                columns={columns}></DataGrid>
            </Box>

        </>

    )
}

export default PairingsTool;