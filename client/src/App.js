import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';
import { renderToStaticMarkup } from 'react-dom/server';
import { makeStyles } from '@material-ui/styles';

import Background from './components/Background';
import './App.css';
import { UserInfoContext } from './Contexts';
import AppBar from './components/AppBar';
import Home from './pages/Home';
import About from './pages/About';
import LogIn from './pages/LogIn';

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500]
    },
    secondary: {
      main: orange[500]
    }
  }
});

const useStyles = makeStyles(theme => ({
    root: {
      backgroundSize: "cover",
      backgroundRepeat: "repeat-y",
      minHeight: "100%"
    }
}));

export default function App() {
  let classes = useStyles();
  const [theme] = React.useState(defaultTheme);
  const [userInfo, setUserInfo] = React.useState({ info: null });

  const svgString = encodeURIComponent(renderToStaticMarkup(<Background theme={theme}/>));
  const uri = `url("data:image/svg+xml,${svgString}")`;

  return (
    <UserInfoContext.Provider className={classes.root} value={{ info: userInfo.info, setInfo: setUserInfo }}>
      <ThemeProvider theme={theme}>
        <div className={classes.root} style={{backgroundImage: uri}}>
          <AppBar />
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/login">
                <LogIn />
              </Route>
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </UserInfoContext.Provider>
  )
}