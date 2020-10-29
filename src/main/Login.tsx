import React from "react";
import {Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import MyAmplifyAuthenticator from "../component/MyAmplifyAuthenticator";

const useStyles = makeStyles(_theme => ({
  unauthenticated: {
    textAlign: 'center',
    marginTop: 35,
    maxHeight: 589,
    overflowY: 'hidden',
  },
}));

const Login = () => {

  const classes = useStyles();

  return <div className={classes.unauthenticated}>
    <Typography variant="subtitle1">
      As Login is wrapped with <strong>UnauthenticatedRoute</strong><br />
      you can access here only if your are unauthenticated
    </Typography><br />
    <MyAmplifyAuthenticator />
  </div>

};
export default Login;
