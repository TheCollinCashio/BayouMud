const RibServer = require('rib-server').default;

let PORT = process.env.PORT || 5000;
RibServer.startServer(PORT, `Server Started on Port ${PORT}`);

if (process.env.NODE_ENV === 'production') {
  RibServer.setClientFolder({ path: '', fullpath: `${__dirname}/client/build` });
  RibServer.setRoute('*', `${__dirname}/client/build/index.html`);
}

let myRib = new RibServer();
myRib.onConnect((client) => {
  myRib.sendMSG("Welcome to this example 😃", { query: client });
});

myRib.possibleClientFunctions(["sendMSG"]);

function logMessage(msg) {
  console.log(msg);
}

myRib.exposeFunction(logMessage);

//const { User } = require('./server/Models');


// app.post('/api/auth/signin', (req, res) => {
//   User.findOne({ username: username }, function (err, user) {
//     if (err) {
//       res.send(400).json(err);
//     } else {
//       user.comparePassword(password, function(err, isMatch) {
//         if(err) {
//           res.send(403).json(err);
//         }

//         if (isMatch) {
//           let token = jwt.sign({ username: username }, tokenKey, { expiresIn: '24h' });
//           res.json({
//             success: true,
//             message: 'Authentication successful!',
//             token: token
//           });
//         }
//       })
//     }
//   });
// });
