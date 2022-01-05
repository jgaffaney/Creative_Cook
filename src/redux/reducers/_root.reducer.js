import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import challenge from './challenge.reducer';
import ingredients from './ingredients.reducer';
import recipes from './recipe.reducer';
import userCombos from './user_combos.reducer';
import comboSelect from './combo.reducer';
import comboGoal from './comboGoal.reducer';
import pairings from './pairings.reducer';
import combo from './combo.reducer';
import ingredientSearch from './ingredientSearch.reducer';
import ingredientGoal from './ingredientGoal.reducer';
import ingredientUnique from './ingredientUnique.reducer';
import recipeGoal from './recipeGoal.reducer';
import recipeSaved from './recipeSaved.reducer';
import unpaired from './unpaired.reducer';
import top5 from './top5.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors,     // contains registrationMessage and loginMessage
  user,       // will have an id and username if someone is logged in
  challenge,  // will contain all challenges made
  ingredients, // holds all information from DB for ingredients
  recipes,    // holds the response of recipes from API (edamam)
  combo,      // holds the selected ingredients while creating a flavor combo (3 ingredients)
  userCombos, // Holds the logged in user's combos
  comboSelect, // holds the selected ingredients while creating a flavor combo (3 ingredients)
  comboGoal,
  pairings, // holds all the pairings available in the database-admin edit only
  ingredientSearch, // holds search text for <IngredientAutocomplete> 
  ingredientGoal,
  ingredientUnique,
  recipeGoal,
  recipeSaved,
  unpaired, // holds the ingredients that are not paired with the selected ingredient
  top5, // holds the top five most used ingredients by all users
  // goal,
  pairings,    // holds all the pairings available in the database-admin edit only
  ingredientSearch, // holds search text for <IngredientAutocomplete> 
  unpaired,    // holds the ingredients that are not paired with the selected ingredient
  top5,       // holds the top five most used ingredients by all users
});

export default rootReducer;
