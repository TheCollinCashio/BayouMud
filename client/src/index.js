import React from 'react';
import RibClient from 'rib-client';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

let myRib = new RibClient("http://localhost:5000");
function sendMSG(message) {
    console.log(message);
}
myRib.exposeFunction(sendMSG);

myRib.onConnect(() => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
    myRib.logMessage('Hello from the other side 👋🏻');
});

serviceWorker.unregister();
