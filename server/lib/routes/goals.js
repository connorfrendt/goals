const express = require('express');
const client = require('../db-client');
const Router = express.Router;
const router = Router(); //eslint-disable-line new-cap

router
  .get('/', (req, res) => {
    client.query(`
      SELECT id, goal_name, type, start_date as "startDate", end_date as "endDate"
      FROM goals
      WHERE profile_id = $1;
    `,
    [req.userId])
      .then(result => {
        res.json(result.rows);
      });
  })

  .post('/', (req, res) => {
    const body = req.body;
    console.log('asdfasdf', body.startDate, body.endDate);
    client.query(`
      INSERT INTO goals (goal_name, type, profile_id, start_date, end_date)
      VALUES($1, $2, $3, $4, $5)
      RETURNING id, goal_name, type, start_date as "startDate", end_date as "endDate";
    `,
    [body.goal_name, body.type, req.userId, body.startDate, body.endDate])
      .then(result => {
        res.json(result.rows[0]);
      });
  })

  .put('/:id/completed', (req, res) => {
    const completed = req.body.completed;

    client.query(`
      UPDATE goals
      SET completed = $1
      WHERE id = $2
      AND profile_id = $3
      RETURNING *;
    `,
    [completed, req.params.id, req.userId]
    )
      .then(result => {
        res.json(result.rows[0]);
      });
  });

  module.exports = router;