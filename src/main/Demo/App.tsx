import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Typography} from "@material-ui/core";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Typography variant="subtitle1" align='center' style={{paddingTop: 20}}>
          As Demo is wrapped with <strong>AuthenticatedRoute</strong><br />
          you can access here only if your are authenticated
        </Typography>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
