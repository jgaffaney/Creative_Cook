import { useSelector, useDispatch } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';


// --- MUI sx STYLES --- // 
import { sxSearchText } from '../Home/Home.style';


// a component for searching through the list of ingredients
// you need to add an event handler to the component this is called into 
//  that gets searchText from the store and does what you need with it
const IngredientAutocomplete = () => {

    const dispatch = useDispatch();

    const ingredients = useSelector(store => store.ingredients);
    const searchText = useSelector(store => store.ingredientSearch);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (


        <Autocomplete
            freeSolo
            required
            size="small"
            disableClearable
            options={ingredients.map(item => (capitalizeFirstLetter(item.name)))}
            onChange={(event, value) => dispatch({ type: 'SET_INGREDIENT_SEARCH', payload: value.toLowerCase() })}

            renderInput={(params) => (
                <TextField sx={sxSearchText}
                    {...params}
                    type="search"
                    autoComplete="off"
                    variant="outlined"
                    label="Search ingredients"
                    value={searchText}
                    onChange={(event, value) => dispatch({ type: 'SET_INGREDIENT_SEARCH', payload: event.target.value.toLowerCase() })}
                />
            )}
        />
    )
}

export default IngredientAutocomplete;