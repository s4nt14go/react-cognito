import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Routes from "./Routes";
import { Amplify } from 'aws-amplify';
import config from './config';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Inter',
      'Roboto', 'Helvetica', 'Arial', 'sans-serif'  // Default Roboto typography
    ].join(','),
  },
  /*palette: {
    primary: {
      main: '#6200ee',
    },
    secondary: {
      main: '#03dac6',
    },
  },*/
  zIndex: {
    drawer: 90  /* For some login events an Amplify built-in toast is shown with z-index: 99 at the top. As material Drawer has a default z-index: 1200, we have to override it with a lower value so the message isn't covered by it */
  }
});

console.log(theme);

if (process.env.REACT_APP_STAGE !== "prod") {
  console.log('REACT_APP_STAGE', process.env.REACT_APP_STAGE);
}

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
