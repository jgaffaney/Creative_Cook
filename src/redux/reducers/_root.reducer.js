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
import uploadedFile from './uploadFile.reducer';
import comboMetrics from './combo_metrics.reducer';
import userRecipes from './user_recipes.reducer';
import recipeMetrics from './recipe_metrics.reducer';
import ingredientMetrics from './ingredient_metrics.reducer';
import comboPairingOne from './ingredient1pair.reducer';
import comboPairingTwo from './ingredient2pair.reducer';
import healthFilter from './health.filter.reducer';
import recipeSnackbar from './saverecipe.snackbar';
import comboSnackbar from './savecombo.snackbar';
import seasons from './seasons.reducer';
import types from './types.reducer';
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
  comboGoal,
  ingredientSearch, // holds search text for <IngredientAutocomplete> 
  ingredientGoal,
  ingredientUnique,
  recipeGoal,
  recipeSaved,
  unpaired, // holds the ingredients that are not paired with the selected ingredient
  // goal,
  uploadedFile,  // holds the csv to be uploaded to the database
  pairings,    // holds all the pairings available in the database-admin edit only
  top5,       // holds the top five most used ingredients by all users
  comboMetrics, // holds all combo profile metrics
  userRecipes, // holds all saved recipes from the user
  recipeMetrics, // holds all recipe profile metrics
  ingredientMetrics, // holds all ingredient profile metrics
  comboPairingOne, // holds pairings for first ingredient selected when creating a combo
  comboPairingTwo, // holds pairings for second ingredient selected when creating a combo
  seasons, // holds enum values from season column in DB
  types, // hold enum values from type column in DB
  healthFilter, // holds the health filter for recipes search
  recipeSnackbar, // holds the status for recipe snack bar
  comboSnackbar, // holds status for combo snack bar
});

export default rootReducer;
