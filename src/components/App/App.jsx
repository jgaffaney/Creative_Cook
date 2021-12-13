import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Home from '../Home/Home';
import Combo from '../Combo/Combo';
import Profile from '../Profile/Profile';
import Ingredients from '../Ingredients/Ingredients';
import Feed from '../Feed/Feed';


import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />

        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/dashboard */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/home will take you to the Home Page / Dashboard */}
          <ProtectedRoute
            // if logged in shows Home Page or else shows LoginPage
            exact
            path="/home"
          >
            <Home />
          </ProtectedRoute>

          {/* Visiting localhost:3000/combo will take you to the Combo Tool Page */}
          <ProtectedRoute
            // logged in shows Combo Tool or else shows LoginPage
            exact
            path="/combo"
          >
            <Combo />
          </ProtectedRoute>

          {/* Visiting localhost:3000/profile will take you to the Profile Page */}
          <ProtectedRoute
            // logged in shows Profile Page or else shows LoginPage
            exact
            path="/profile"
          >
            <Profile />
          </ProtectedRoute>

          {/* Visiting localhost:3000/ingredients will allow user to add a new plant. */}
          <ProtectedRoute
            // logged in shows Admin Ingredients Page or else shows LoginPage
            exact
            path="/ingredients"
          >
            <Ingredients />
          </ProtectedRoute>

          {/* Visiting localhost:3000/feed will allow admin to view their feed content */}
          <ProtectedRoute
            // logged in shows Admin Feed Page or else shows LoginPage
            exact
            path="/feed"
          >
            <Feed />
          </ProtectedRoute>




          {/* --- LOGIN vs REGISTER --- */}

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
