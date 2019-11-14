import React from 'react';
import RibClient from 'rib-client';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

let namespace = process.env.REACT_APP_PROXY || "/";
let myRib = new RibClient(namespace, true);

function sendMSG(message) {
    console.log(message);
}
myRib.exposeFunction(sendMSG, null, 'sendMSG');

myRib.onConnect(() => {
    if (process.env.REACT_APP_ENV !== 'production') {
        console.log(`Let's develop great things 😀`);
        window.myRib = myRib;
    }
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );

    myRib.logMessage('Hello from the other side 👋🏻');
});

serviceWorker.unregister();
