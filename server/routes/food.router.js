const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*** GET ROUTES ***/
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

router.get('/allergy', (req, res) => {
  const sqlQuery = `SELECT * FROM "allergy_groups";`;

  pool
    .query(sqlQuery)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error in db GET /allergy', err);
      res.sendStatus(500);
    });
});

router.get('/ingredients', (req, res) => {
  const sqlQuery = `SELECT "ingredients".id, "ingredients".description as Ingredient, "ingredients".allergy_id as all_id, "allergy_groups".description as Group FROM "ingredients"
  JOIN "allergy_groups" ON "ingredients".allergy_id = "allergy_groups".id;`;

  pool
    .query(sqlQuery)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error in db GET /allergy', err);
      res.sendStatus(500);
    });
});

/*** POST ROUTES ***/
router.post('/add', (req, res) => {
  // Save ingredients array as variable
  const ingredients = req.body.ingredients;

  // SQL to add initial food entry and return the ID
  const sqlFoods = `
  INSERT INTO "foods" ("brand_id", "description", "image")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  pool
    .query(sqlFoods, [req.body.brand, req.body.description, req.body.image])
    .then((dbRes) => {
      // Save new food ID
      const newFoodID = dbRes.rows[0].id;

      // Start the SQL statement for adding the Ingredients
      let sqlIngredients = `INSERT INTO "ingredients" ("description")
      VALUES`;

      // For each ingredient on the list, add a placeholder
      for (let i = 1; i < ingredients.length + 1; i++) {
        sqlIngredients = sqlIngredients.concat(`($${i})`);

        // Add comma to all lines except the last
        if (i !== ingredients.length) {
          sqlIngredients = sqlIngredients.concat(`,
          `);
        }
      }

      // Add argument so duplicate ingredients will not be added
      sqlIngredients = sqlIngredients.concat(`
      ON CONFLICT ("description")
      DO NOTHING;`);

      //console.log(sqlIngredients);

      pool
        .query(sqlIngredients, ingredients)
        .then((dbRes) => {
          // Start SQL for join table
          let sqlJoin = `INSERT INTO "foods_ingredients" ("food_id", "ingredients_id")
          VALUES `;

          // Add line for each ingredient
          for (let i = 0; i < ingredients.length; i++) {
            sqlJoin = sqlJoin.concat(
              `('${newFoodID}', (SELECT "id" from "ingredients" WHERE "description" = '${ingredients[i]}'))`
            );

            // Add comma to all lines except the last
            if (i !== ingredients.length - 1) {
              sqlJoin = sqlJoin.concat(`,
              `);
            }
          }

          // Close SQL query
          sqlJoin = sqlJoin.concat(';');

          //console.log(sqlJoin);

          pool
            .query(sqlJoin)
            .then((dbRes) => {
              console.log(`Insert successful!`);
              res.sendStatus(200);
            })
            .catch((err) => {
              console.log('Error in making join', err);
            });
        })
        .catch((err) => {
          console.log('Error adding Ingredients', err);
        });
    })
    .catch((err) => {
      console.log('Error in /add', err);
      res.sendStatus(500);
    });
});

router.post('/allergy/add', (req, res) => {
  console.log('in router', req.body);
  const sqlQuery = `INSERT INTO "allergy_groups" ("description")
  VALUES ($1)`;

  pool
    .query(sqlQuery, [req.body.description])
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error in db ADD /allergy', err);
      res.sendStatus(500);
    });
});

module.exports = router;
