const client = require('../lib/db-client');

const goals = [
  { 
    goal_name: 'Python Course',
    type: 'Academic',
    startDate: "12/11/2018",
    endDate: "1/1/2019"
  },

  {
    goal_name: 'Dance',
    type: 'Recreational',
    startDate: "12/11/2018",
    endDate: "1/2/2019"
  },

  {
    goal_name: 'Have fun!',
    type: 'Recreational',
    startDate: "12/11/2018",
    endDate: "1/3/2019"
  }
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
          INSERT INTO goals (goal_name, type, profile_id, start_date, end_date)
          VALUES ($1, $2, $3, $4, $5)
        `,
        [goals.goal_name, goals.type, profile.id, goals.startDate, goals.endDate]);
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