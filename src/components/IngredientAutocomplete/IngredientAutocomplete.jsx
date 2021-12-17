import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';


// --- MUI sx STYLES --- // 
import { sxSearchText } from '../Home/Home.style';

const IngredientAutocomplete = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const ingredients = useSelector(store=>store.ingredients);
    const searchText = useSelector(store=>store.ingredientSearch);


    // const [searchText, setSearchText] = useState('');

    // const handleSearch = (searchText) => {
    //     console.log('CLICKED on handleSearch');
    //     console.log('this is the searchText', searchText);

    //     const searchedIngredientOne = ingredients.filter(ingredient => ingredient.name === searchText)
    //     console.log('--- searchedIngredientOne:', searchedIngredientOne);

    //     // put ingredient into the reducer
    //     dispatch({ type: 'SET_COMBO_INGREDIENT', payload: searchedIngredientOne[0] })

    //     // push user to /combo
    //     history.push('/combo')
    // }


    return(

                            <Autocomplete
                                freeSolo
                                required
                                size="small"
                                disableClearable
                                options={ingredients.map(item => (item.name))}
                                onChange={(event, value) => dispatch({type: 'SET_INGREDIENT_SEARCH', payload: value})}

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
    )
}

export default IngredientAutocomplete;