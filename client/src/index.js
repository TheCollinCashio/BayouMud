import React from 'react';
import RibClient from 'rib-client';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

let namespace = process.env.REACT_APP_PROXY || "/";
let myRib = new RibClient(namespace);

myRib.onConnect(() => {
    console.log('ENV: ' + process.env.REACT_APP_ENV);
    if (process.env.NODE_ENV !== 'production') {
        //  allow rib to be accessed via console app
        console.log(`Let's develop great things 😀`);
        window.myRib = myRib;
    }
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
    function sendMSG(message) {
        console.log(message);
    }
    myRib.exposeFunction(sendMSG);

    myRib.logMessage('Hello from the other side 👋🏻');
});

serviceWorker.unregister();
