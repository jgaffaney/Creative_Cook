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

    // const [newPairings, setNewPairings] = useState();

    const handleSetIngredient = () => {
        console.log('Submit clicked with id: ', searchText);
        let id = 0;

        // convert searchText to an ingredient id from DB query
        for (let ingredient of ingredients) {
            if (ingredient.name === searchText) {
                id = ingredient.id;
            }
        }
        console.log('Converted name to id yields id: ', id);
        dispatch({ type: 'FETCH_PAIRINGS', payload: id })

    }


    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name' },
    ]

    const unpairedIngredients = () => {
        console.log('in unpairedIngredients');
        let resultArray = [];
        for(let name of ingredients.filter(name => name.name != searchText)){
            for(let pair of pairings) {
                if (pair.name.toLowerCase() != name.name) {
                    resultArray.push(name)
                }
            }
        }
        let newArray = [...new Set(resultArray)];
        if(newArray === []){
            return ingredients;
        } else {
            return newArray;
        }

    }

    

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
                {/* <h2>Paired with {searchText[0].toUpperCase() + searchText.substring(1)}</h2> */}
                <DataGrid
                    rows={pairings}
                    columns={columns}>
                </DataGrid>
            </Box>
            <Box sx={{ height: 400, width: '100%' }}>
                {/* <h2> Pair {searchText[0].toUpperCase() + searchText.substring(1)} with: </h2> */}
                <DataGrid
                    rows={unpairedIngredients()}
                    columns={columns}
                >
                </DataGrid>
            </Box>

        </>

    )
}

export default PairingsTool;