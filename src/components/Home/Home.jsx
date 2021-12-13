import React, {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';

function Home() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const challenge = useSelector((store) => store.challenge);

  useEffect(() => {
    dispatch({ type: 'FETCH_CHALLENGES' });
}, []);


  return (
    <div className="container">
      <h2>Welcome To The Home Page!</h2>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Home;
