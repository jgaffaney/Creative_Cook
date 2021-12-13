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

          {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/user will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
              Even though it seems like they are different pages, the user is always on localhost:3000/user */}

          {/* Visiting localhost:3000/dashboard will show the user their dashboard & water schedule. */}
          <ProtectedRoute
            // logged in shows Dashboard else shows LoginPage
            exact
            path="/home"
          >
            <Dashboard />
            {/* <Nav /> */}
          </ProtectedRoute>

          {/* Visiting localhost:3000/collection will show the use their collection of plants. */}
          <ProtectedRoute
            // logged in shows Collection else shows LoginPage
            exact
            path="/combo"
          >
            <Collection />
          </ProtectedRoute>

          {/* Visiting localhost:3000/PlantDetails by tapping on the plant from either the dashboard or the collection page you will be brought here*/}
          <ProtectedRoute
            // logged in shows PlantDetails when tapped on 
            exact
            path="/profile"
          >
            <PlantDetails />
          </ProtectedRoute>

          {/* Visiting localhost:3000/add_plant will allow user to add a new plant. */}
          <ProtectedRoute
            // logged in shows PlantForm else shows LoginPage
            exact
            path="/adminIngredients"
          >
            <PlantForm />
          </ProtectedRoute>

          {/* Visiting localhost:3000/user_profile will allow user to view their profile */}
          <ProtectedRoute
            // logged in shows Profile else shows LoginPage
            exact
            path="/adminFeed"
          >
            <Profile />
          </ProtectedRoute>







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
