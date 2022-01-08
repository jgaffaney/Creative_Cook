import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import ComboTool from '../ComboTool/ComboTool';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function Feed() {
  const user = useSelector((store) => store.user);
  const recipes = useSelector(store => store.recipe);
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients);
  const userCombos = useSelector(store => store.userCombos);
  const top5 = useSelector(store => store.top5);

  useEffect(() => {
    dispatch({ type: 'FETCH_INGREDIENTS' });
    dispatch({ type: 'FETCH_COMBOS' });
    dispatch({ type: 'FETCH_TOP5' });
  }, [])

  const [newChallenge, setNewChallenge] = useState({ type: 'Combo of the Week', description: '', combo_id: '' })

  //Sets newChallenge local state to the passed in input
  const handlePropertyChange = (event, property) => {
    setNewChallenge({ ...newChallenge, [property]: event.target.value })
  };

  // Sends new challenge to the saga
  const addNewChallenge = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_CHALLENGE', payload: newChallenge });
    setNewChallenge({ type: 'Combo of the Week', description: '', combo_id: '' })
    setOpen(true);
  };

  let topFiveIngredients = []
  for (let ingredient of ingredients) {
    if (ingredient?.id === top5[0]?.ingredient_id) {
      topFiveIngredients.push(ingredient)
    } else if (ingredient?.id === top5[1]?.ingredient_id) {
      topFiveIngredients.push(ingredient)
    } else if (ingredient?.id === top5[2]?.ingredient_id) {
      topFiveIngredients.push(ingredient)
    } else if (ingredient?.id === top5[3]?.ingredient_id) {
      topFiveIngredients.push(ingredient)
    } else if (ingredient?.id === top5[4]?.ingredient_id) {
      topFiveIngredients.push(ingredient)
    }
  }

  // Alert showing combo was added to feed
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const sxFeaturedCombo = {
    display: 'flex',
    flexDirection: 'column',
    mx: 'auto',
    width: '90%',
  }

  const sxMetrics = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    mx: 'auto',
    height: 'auto',
  }

  const sxFlavorCombos = {
    border: '1px solid black',
    // display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    overflow: 'auto',
    mb: 2
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  console.log('Challenge', newChallenge);
  console.log(topFiveIngredients);
  return (
    <>
      <Box sx={sxMetrics}>
        <Typography variant='h4' sx={{mb: 4}}>App Wide User Metrics</Typography>
        <Box sx={sxMetrics}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>Top 5 Ingredients Used:
                <Typography sx={{fontSize: 12}}>{topFiveIngredients[0]?.name} ({top5[0]?.times_used})</Typography>
                <Typography sx={{fontSize: 12}}>{topFiveIngredients[1]?.name} ({top5[1]?.times_used})</Typography>
                <Typography sx={{fontSize: 12}}>{topFiveIngredients[2]?.name} ({top5[2]?.times_used})</Typography>
                <Typography sx={{fontSize: 12}}>{topFiveIngredients[3]?.name} ({top5[3]?.times_used})</Typography>
                <Typography sx={{fontSize: 12}}>{topFiveIngredients[4]?.name} ({top5[4]?.times_used})</Typography>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>% of Used Ingredients by Type</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>% of Users by Family Size</Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <br />
      <Box sx={sxFeaturedCombo}>
        <Typography variant='h4' sx={{ textAlign: "center", my: 4}}>Create Featured Combo</Typography>

        {/* combo selector */}
        <ComboTool />

        {/* list of ingredients from DB */}
        <ul>
          {ingredients.map((ingredient) => {
            return (
              <li
                key={ingredient.id}
                value={ingredient}
                onClick={() => dispatch({ type: 'SET_COMBO_INGREDIENT', payload: ingredient })}>{ingredient.name}</li>
            )
          })}
        </ul>
        <br />

        <Typography sx={{ textAlign: "center" }}>Saved Flavor Combos</Typography>
        <Box sx={sxFlavorCombos}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {userCombos.map((combo) => {

              return (
                <Grid item xs={2} sm={4} md={4} key={combo.id} >
                  <Item
                    onClick={(event) => handlePropertyChange(event, 'combo_id')}
                  >
                    <List>
                      <ListItem sx={{ p: 3, border: '1px solid black' }} value={combo.id}>{combo.name}</ListItem>
                    </List>

                  </Item>
                </Grid>
              )
            })}
          </Grid>
        </Box>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            sx={{ mb: 2, width: '60%', mx: 'auto' }}
            id="outlined-basic"
            variant="outlined"
            label="Description of Featured Combo"
            type="text"
            value={newChallenge.description}
            onChange={(event) => handlePropertyChange(event, 'description')}
          />
          <Button sx={{ width: 5 }} onClick={addNewChallenge} variant="contained">submit</Button>
        </Grid>
        {/* <Button sx={{ width: 5 }} onClick={() => dispatch({ type: 'ADD_CHALLENGE', payload: newChallenge })} variant="contained">submit</Button> */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Combo Added to Feed!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

// this allows us to use <App /> in index.js
export default Feed;
