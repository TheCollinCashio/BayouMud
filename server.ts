import RibServer from 'rib-server';
import App from './App'
import { User } from './server/Models';

let PORT = parseInt(process.env.PORT || '5000');
RibServer.startServer(PORT, `Server Started on Port ${PORT}`);
RibServer.setRedisUrl(process.env.REDIS_URL);

// add comment here
if (process.env.NODE_ENV !== 'local') {
  RibServer.setClientFolder({ path: '', fullPath: `${__dirname}/client/build` });
  RibServer.setRoute('*', `${__dirname}/client/build/index.html`);
}

const myRib = App();

async function getUserName(client) {
  return client.username
}

async function getSocketUserName(socketToken) {
  return myRib.runPOF("_ribGetClientObjectDeleteMapItem", socketToken)
}

function logMessage(msg) {
  console.log(msg);
}

async function createUser(userObj) {
  let newUser = new User(userObj);
  return await newUser.save((err, user) => {
    if (err) {
      console.log(err);
    } else {
      return user;
    }
  })
}

async function login(userObj, client) {
  User.findOne({username: userObj.username}, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      user.comparePassword(userObj.password, (err, isMatch) => {
        if (isMatch) {
          console.log('IS MATCH')
          client.username = user.username
        }
      })
    }
  });
}

myRib.exposeFunctions([createUser, login, logMessage, getUserName, getSocketUserName]);

myRib.onConnect((client) => {
  myRib.clientFunctions.sendMSG("Welcome to this example 😀", { query: client })
});

