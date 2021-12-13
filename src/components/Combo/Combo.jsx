import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';

function Combo() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const recipes = useSelector(store => store.recipe);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch({ type: 'FETCH_RECIPES' })
  }, [])

  const ingredients = ['asparagus', 'butter', 'apple', 'chicken', 'strawberry', 'sugar', 'lemon'];

  const ingredientSelector = (event) => {
    console.log(event);
    try {
      dispatch({ type: 'SET_SELECTED_INGREDIENT' })
    } catch (error) {
      console.log('error', error);
    }
  } // end ingredientSelector

  return (
    <div className="container">
      <h2>Welcome To The Combo Page!</h2>

      <ul>
        {ingredients.map((ingredient, i) => {
          return (
            <li key={i}
              onClick={(event) => ingredientSelector(event.target.value)}>{ingredient}</li>
          )
        })}
      </ul>

    </div>
  );
}

// this allows us to use <App /> in index.js
export default Combo;
