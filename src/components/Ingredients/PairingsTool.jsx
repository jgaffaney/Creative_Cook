import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IngredientAutocomplete from '../IngredientAutocomplete/IngredientAutocomplete';

import Typography from '@mui/material/Typography';

// --- sx STYLES --- // 

import { sxSearchContainer } from '../Home/Home.style';

import {
    sxPairingToolContainer,
    sxCenterText,
    sxPairToolHeader,
    sxPairWithContainer,
    sxPairedWithContent,
    sxNotPairedWithContent,
} from './Ingredients.style';

const PairingsTool = () => {

    const dispatch = useDispatch();

    const pairings = useSelector(store => store.pairings);
    const searchText = useSelector(store => store.ingredientSearch);
    const ingredients = useSelector(store => store.ingredients);
    const unpaired = useSelector(store => store.unpaired)

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
            for (let pair of pairings) {
                console.log('in pair for with pair: ' + pair + ' and ingred: ' + ingredient);
                if (pair.name == ingredient.name) {
                    return ingredient;
                }
            }
        });
        setUnpairedIngredients(resultArray);

    }


    const columns = [
        { field: 'id', headerName: 'ID',},
        { field: 'name', headerName: 'Name', width: 420},
    ]

    const addNewPairing = (params) => {
        dispatch({ type: 'ADD_PAIRING', payload: params.id, pairWith: convertNameToId(), ingredients: ingredients })

    }

    const removePairing = (params) => {
        dispatch({ type: 'DELETE_PAIRING', payload: params.id, pairWith: convertNameToId(), ingredients: ingredients })
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

        <Box sx={sxPairingToolContainer}>
            <Typography variant="h4" sx={sxCenterText}>Manage Ingredient Pairs</Typography>
            <Box sx={sxSearchContainer}>
                <IngredientAutocomplete />
                <Button onClick={handleSetIngredient} variant='outlined' >Search</Button>

            </Box>

            {/* force user to search for their first desired ingredient, then display pairing tables content*/}
            {pairedWith &&
                <Box sx={sxPairWithContainer}>
                    <Box sx={sxPairedWithContent}>
                        {pairedWith ?
                            <>
                                <Typography variant="h5" sx={sxPairToolHeader}> All Ingredients Paired With {pairedWith[0].toUpperCase() + pairedWith.substring(1)}</Typography>
                                <Typography variant="body1" sx={{ textAlign: 'center', mt: -1, mb: 1, }}>Click to remove a paired ingredient</Typography>
                            </>
                            :
                            <Typography variant="h5" sx={sxPairToolHeader}>Search For an Ingredient to Start the Paring Process</Typography>}

                        <DataGrid
                            sx={{ cursor: 'pointer', }}
                            density="compact"
                            rows={pairings}
                            columns={columns}
                            onRowClick={removePairing}>
                        </DataGrid>
                    </Box>

                    <Box sx={sxNotPairedWithContent}>
                        {pairedWith ?
                            <>
                                <Typography variant="h5" sx={sxPairToolHeader}>Not Paired With {pairedWith[0].toUpperCase() + pairedWith.substring(1)} </Typography>
                                <Typography variant="body1" sx={{ textAlign: 'center', mt: -1, mb: 1, }}>Click to assign ingredient as pairing</Typography>
                            </>
                            :
                            <Typography variant="h5" sx={sxPairToolHeader}>No ingredient selected</Typography>}
                        <DataGrid
                            sx={{ cursor: 'pointer', overflowY: 'auto', }}
                            density="compact"
                            rows={unpaired.filter(ingredient => ingredient.name != pairedWith)}
                            columns={columns}
                            onRowClick={addNewPairing}
                        >
                        </DataGrid>
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default PairingsTool;