const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/brands', (req, res) => {
  const sqlQuery = `SELECT * FROM "brands"`;

  pool
    .query(sqlQuery)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error in db GET /brands', err);
      res.sendStatus(500);
    });
});

router.post('/add', (req, res) => {
  console.log('in POST', req.body);

  const sqlFoods = `
  INSERT INTO "foods" ("brand_id", "description", "image")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  pool
    .query(sqlFoods, [req.body.brand, req.body.description, req.body.image])
    .then((dbRes) => {
      console.log('Food ID', dbRes.rows[0].id);

      const newFoodID = dbRes.rows[0].id;

      const ingredients = req.body.ingredients;

      for (let i = 1; i < ingredient.length; i++) {
        const element = array[i];
      }
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error in /add', err);
      res.sendStatus(500);
    });
});

module.exports = router;
