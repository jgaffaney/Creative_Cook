import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';

function Combo() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const recipes = useSelector(store => store.recipe)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_RECIPES' })
  }, [])
  return (
    <div className="container">
      <h2>Welcome To The Combo Page!</h2>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Combo;
