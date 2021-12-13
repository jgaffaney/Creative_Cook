import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Ingredients() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const ingredients = useSelector((store) => store.ingredients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_INGREDIENTS'})
  }, [])

  return (
    <div className="container">
      <h2>Welcome To The Ingredients Page!</h2>
        <p>{ingredients[0].name}</p>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Ingredients;
