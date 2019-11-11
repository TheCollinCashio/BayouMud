const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const { User } = require('./server/Models')
const { checkToken } = require('./server/Token');

const app = express();
const port = process.env.PORT || 5000;
const tokenKey = process.env.TOKEN_KEY;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res, next) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/auth/signin', (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;

  console.log(username);
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      res.send(400).json(err);
    } else {
      user.comparePassword(password, function(err, isMatch) {
        if(err) {
          res.send(403).json(err);
        }

        if (isMatch) {
          let token = jwt.sign({ username: username }, tokenKey, { expiresIn: '24h' });
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        }
      })
    }
  });
});

app.post('/api/secret', checkToken, (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));