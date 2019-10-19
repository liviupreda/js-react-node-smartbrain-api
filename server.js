const express = require('express');
const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('Running ...');
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});

/*
/ --> res = Running ...
/signin --> POST = success/ fail
/register --> POST = user
/profile/:userId --> GET
/image --> PUT --> user
*/
