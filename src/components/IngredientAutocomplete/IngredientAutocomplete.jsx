import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';


// --- MUI sx STYLES --- // 
import { sxSearchContainer, sxSearchText } from '../Home/Home.style';

const IngredientAutocomplete = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const ingredients = useSelector(store=>store.ingredients);

    const [searchText, setSearchText] = useState('');

    const handleSearch = (searchText) => {
        console.log('CLICKED on handleSearch');
        console.log('this is the searchText', searchText);

        const searchedIngredientOne = ingredients.filter(ingredient => ingredient.name === searchText)
        console.log('--- searchedIngredientOne:', searchedIngredientOne);

        // put ingredient into the reducer
        dispatch({ type: 'SET_COMBO_INGREDIENT', payload: searchedIngredientOne[0] })

        // push user to /combo
        history.push('/combo')
    }


    return(
        <Box sx={sxSearchContainer}>

                            <Autocomplete
                                freeSolo
                                required
                                size="small"
                                disableClearable
                                options={ingredients.map(item => (item.name))}
                                onChange={(event, value) => setSearchText(value)}

                                renderInput={(params) => (
                                    <TextField sx={sxSearchText}
                                        {...params}
                                        type="search"
                                        autoComplete="off"
                                        variant="outlined"
                                        label="Search ingredients"
                                        value={searchText}
                                    />
                                )}
                            />
                            <Button onClick={() => handleSearch(searchText)} variant="contained">search</Button>

                        </Box>
    )
}

export default IngredientAutocomplete;