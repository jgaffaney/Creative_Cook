import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import LoginPage from '../LoginPage/LoginPage';
import Home from '../Home/Home';
import Combo from '../Combo/Combo';
import Profile from '../Profile/Profile';
import Ingredients from '../Ingredients/Ingredients';
import Feed from '../Feed/Feed';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// --- MUI sx STYLES --- // 
import {
  sxCenterText,
} from '../Home/Home.style';

// let's set up a theme for our project
const theme = createTheme({
  palette: {
    primary: {
      main: 'hsla(220, 80%, 50%, 1)',
      dark: 'hsla(220, 80%, 30%, 1)',
      light: 'hsla(220, 80%, 70%, 1)',
    },
    secondary: {
      main: 'hsla(120, 95%, 50%, 1)',
      dark: 'hsla(120, 80%, 30%, 1)',
      light: 'hsla(120, 80%, 70%, 1)',
    },
    error: {
      main: 'hsla(350, 80%, 50%, 1)',
    },
    info: {
      main: 'hsla(0, 5%, 20%, 1)',
      dark: 'hsla(0, 5%, 20%, 1)',
      light: 'hsla(0, 5%, 90%, 1)',
    }
  },
});


import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_SEASONS' });
    dispatch({ type: 'FETCH_TYPES' })
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box>

          <Nav />

          <Switch>
            {/* Visiting localhost:3000/ will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/home will take you to the Home Page */}
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


            {/* --- ADMIN ONLY ROUTES --- */}

            {/* Visiting localhost:3000/ingredients will allow the admin to edit ingredients. */}
            <ProtectedRoute
              // logged in as an Admin allows access to the Ingredients Page or else redirects to the home page
              exact
              path="/ingredients"
            >
              {user.is_admin ?
                // If the user is an admin allow access to this route, otherwise take them to the home page
                <>

                  <Ingredients />
                
                </>
                :
                // if not admin, redirect to the home page
                <Redirect to="/home" />
              }
            </ProtectedRoute>

            {/* Visiting localhost:3000/feed will allow admin to view their feed content */}
            <ProtectedRoute
              // logged in shows Admin Feed Page or else shows LoginPage
              exact
              path="/feed"
            >
              {user.is_admin ?
                // If the user is an admin allow access to this route, otherwise take them to the home page
                <Feed />
                :
                // if not admin, redirect to the home page
                <Redirect to="/home" />
              }
            </ProtectedRoute>



            {/* --- LOGIN vs REGISTER --- */}

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /home page
                <Redirect to="/home" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <br />
              <Typography variant="h1" sx={sxCenterText}>404</Typography>
            </Route>

          </Switch>

          <Footer />

        </Box>
      </Router>
    </ThemeProvider >
  );
}

export default App;
