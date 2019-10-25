const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'liviu',
    password: '123',
    database: 'smart-brain'
  }
});

// db.select('*')
//   .from('users')
//   .then(data => {
//     console.log(data);
//   });

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

// const database = {
//   users: [
//     {
//       id: '123',
//       name: 'John',
//       password: 'cookies',
//       email: 'john@gmail.com',
//       entries: 0,
//       joined: new Date()
//     },
//     {
//       id: '124',
//       name: 'Sally',
//       password: 'bananas',
//       email: 'sally@gmail.com',
//       entries: 0,
//       joined: new Date()
//     }
//   ]
// };

// ROUTES
// GET root
app.get('/', (req, res) => {
  res.send(database.users);
});

// SIGN IN
app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('ERR Login');
  }
});

// REGISTER
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  db('users')
    .returning('*')
    .insert({
      email: email,
      name: name,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json('Unable to register'));
});

// GET user
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Error getting user');
      }
    });
});

// PUT add image entries
app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
});

// // Password hashing
// bcrypt.genSalt(10, function(err, salt) {
//   bcrypt.hash('B4c0//', salt, function(err, hash) {
//     // Store hash in your password DB.
//   });
// });

// // Load hash from your password DB.
// bcrypt.compare('B4c0//', hash, function(err, res) {
//   // res === true
// });
// bcrypt.compare('not_bacon', hash, function(err, res) {
//   // res === false
// });

// LISTEN
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
