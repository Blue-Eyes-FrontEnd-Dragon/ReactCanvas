import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello API!');
});

app.listen(3001, () => console.log('Listening on port: 3001'));
