const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      password: 'cookies',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      password: 'bananas',
      email: 'sally@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ]
};

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
    res.json('OK Login');
  } else {
    res.status(400).json('ERR Login');
  }
});

// CREATE new user
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

// GET user
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json('User not found');
  }
});

// PUT add image entries
app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json('User not found...');
  }
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
