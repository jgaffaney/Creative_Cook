import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import recipeSaga from './recipe.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import challengeSaga from './challenge.saga'
import ingredientSaga from './ingredients.saga';
import comboSaga from './combo.saga';
import comboGoalSaga from './comboGoal.saga';
import pairingsSaga from './pairings.saga';
import ingredientGoalSaga from './ingredientGoal.saga';
import ingredientUniqueSaga from './ingredientUnique.saga';
import recipeGoalSaga from './recipeGoal.saga';
import recipeSavedSaga from './recipeSaved.saga';
import top5Saga from './top5.saga';
import comboMetricsSaga from './combo_metrics.saga';
import userRecipesSaga from './userRecipe.saga';
import recipeMetricsSaga from './recipe_metrics.saga';
import ingredientMetricsSaga from './ingredient_metrics.saga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    challengeSaga(),
    ingredientSaga(),
    recipeSaga(),
    comboSaga(),
    comboGoalSaga(),
    pairingsSaga(),
    ingredientGoalSaga(),
    ingredientUniqueSaga(),
    recipeGoalSaga(),
    recipeSavedSaga(),
    top5Saga(),
    comboMetricsSaga(),
    userRecipesSaga(),
    recipeMetricsSaga(),
    ingredientMetricsSaga(),
  ]);
}
