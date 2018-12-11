const app = require('./lib/app');
const PORT = 3000;

// app.use(express.static('public'));

app.listen(PORT, () => {
  console.log('server app started on port', PORT);
});