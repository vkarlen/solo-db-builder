const express = require('express');
const app = express();
const pool = require('../server/modules/pool');

/*** ROUTES ***/
const foodRouter = require('./routes/food.router');

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));
app.use(express.json());

app.use('/api/food', foodRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}....`);
});
