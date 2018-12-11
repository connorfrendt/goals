const client = require('../lib/db-client');

const goals = [
  { goal_name: 'Python Course', type: 'Academic' },
  { goal_name: 'Dance', type: 'Recreational' },
  { goal_name: 'Have fun!', type: 'Recreational' }
];

client.query(`
  INSERT INTO profile (username, password)
  VALUES ($1, $2)
  RETURNING id;
`,
['frendtc', 'qwerty']
)
  .then(result => {
    const profile = result.rows[0];

    return Promise.all(
      goals.map(goals => {
        return client.query(`
          INSERT INTO goals (goal_name, type, profile_id)
          VALUES ($1, $2, $3)
        `,
        [goals.goal_name, goals.type, profile.id]);
      })
    );
  })
  .then(
    () => console.log('seed data load complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });