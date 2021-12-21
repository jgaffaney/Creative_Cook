const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const challengeRouter = require('./routes/challenge.router');
const ingredientRouter = require('./routes/ingredients.router');
const recipeRouter = require('./routes/recipe.router');
const comboRouter = require('./routes/combo.router');
<<<<<<< HEAD
const goalRouter = require('./routes/goal.router');
=======
const pairingsRouter = require('./routes/pairings.router');
>>>>>>> main


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/challenge', challengeRouter);
app.use('/api/ingredients', ingredientRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/combos', comboRouter);
<<<<<<< HEAD
app.use('/api/goal', goalRouter);
=======
app.use('/api/pairings', pairingsRouter);
>>>>>>> main


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
