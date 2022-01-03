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
    const searchText = useSelector(store => store.ingredientSearch);
    const ingredients = useSelector(store => store.ingredients);
    const unpaired = useSelector(store=>store.unpaired)

    const [pairedWith, setPairedWith] = useState('');
    const [unpairedIngredients, setUnpairedIngredients] = useState([]);

    // const [newPairings, setNewPairings] = useState();

    const convertNameToId = () => {
        for (let ingredient of ingredients) {
            if (ingredient.name === searchText.toLowerCase()) {
                return ingredient.id;
            }
        }
    }

    const handleSetIngredient = () => {
        console.log('Submit clicked with id: ', searchText);
        setPairedWith(searchText);
        let id = 0;
        let resultArray = [];

        // convert searchText to an ingredient id from DB query
        for (let ingredient of ingredients) {
            if (ingredient.name === searchText) {
                id = ingredient.id;
            }
        }
        console.log('Converted name to id yields id: ', id);
        dispatch({ type: 'FETCH_PAIRINGS', payload: id, ingredients: ingredients });

        resultArray = ingredients.map(ingredient => {
            for(let pair of pairings){
                console.log('in pair for with pair: ' + pair + ' and ingred: ' + ingredient);
                if(pair.name == ingredient.name){
                    return ingredient;
                }
            }});
        setUnpairedIngredients(resultArray);

    }


    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name' },
    ]

    const addNewPairing = (params) => {
        dispatch({type: 'ADD_PAIRING', payload: params.id, pairWith: convertNameToId(), ingredients: ingredients})

    }

    const removePairing = (params) => {
        dispatch({type: 'DELETE_PAIRING', payload: params.id, pairWith: convertNameToId(), ingredients: ingredients})
    }

    // const unpairedIngredients = () => {
    //     console.log('in unpairedIngredients');
    //     let resultArray = [];
      
    //     if(!pairings){
    //         console.log('pairings was empty');
    //         return ingredients;
    //     }
        
    //     for(let item of ingredients) {
    //         for(let pair of pairings){
    //             if(item.name === pair.name){
    //                 console.log('found a match');
    //                 resultArray.push(item)
    //             }
    //         }
    //     }
    //     return resultArray
    // }
    

    

    // useEffect(() => {
    //     dispatch({ type: 'FETCH_PAIRINGS' })
    // }, [])
    return (
        <>
            <h1>Pairings Tool</h1>
            <Box sx={sxSearchContainer}>
                <IngredientAutocomplete />
                <Button onClick={handleSetIngredient} variant='contained' >Search</Button>

            </Box>
            <Box sx={{ height: 400, width: '100%' }}>
                {pairedWith ? 
                <h2>Paired with {pairedWith[0].toUpperCase() + pairedWith.substring(1)}</h2>
                :
                <h2>No ingredient selected</h2>}
                <DataGrid
                    rows={pairings}
                    columns={columns}
                    onRowClick={removePairing}>
                </DataGrid>
            </Box>
            <Box sx={{ height: 400, width: '100%' }}>
                {pairedWith ?
                <h2> Pair {pairedWith[0].toUpperCase() + pairedWith.substring(1)} with: </h2>
                :
                <h2>No ingredient selected</h2>}
                <DataGrid
                    rows={unpaired.filter(ingredient=>ingredient.name != pairedWith)}
                    columns={columns}
                    onRowClick={addNewPairing}
                >
                </DataGrid>
            </Box>

        </>

    )
}

export default PairingsTool;