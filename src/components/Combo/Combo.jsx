import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import ComboTool from '../ComboTool/ComboTool';

function Combo() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const recipes = useSelector(store => store.recipe);
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients);

  useEffect(() => {
    dispatch({ type: 'FETCH_INGREDIENTS' })
  }, [])

  return (
    <div className="container">
      <h2>Welcome To The Combo Page!</h2>

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

    </div>
  );
}

// this allows us to use <App /> in index.js
export default Combo;
