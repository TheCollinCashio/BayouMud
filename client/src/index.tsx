import React from 'react';
import RibClient from 'rib-client';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

let namespace = process.env.REACT_APP_PROXY || "/";
let myRib = new RibClient<{logMessage: (msg: string) => void}>(namespace, true);

function sendMSG(message: string) {
    console.log(message);
}
myRib.exposeFunction(sendMSG);

myRib.onConnect(() => {
    if (process.env.REACT_APP_ENV !== 'production') {
        console.log(`Let's develop great things 😀`);
        //@ts-ignore
        window.myRib = myRib;
    }
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );

    myRib.serverFunctions.logMessage('Hello from the other side 👋🏻');
});

serviceWorker.unregister();
