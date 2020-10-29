import React from "react";
import {useApp} from '../layout/Site';
import {Typography} from "@material-ui/core";
import {AmplifySignOut} from '@aws-amplify/ui-react';
import { AuthState } from '@aws-amplify/ui-components';
import { makeStyles } from '@material-ui/core/styles';
import Loading from "../component/Loading";
import MyAmplifyAuthenticator from "../component/MyAmplifyAuthenticator";

const useStyles = makeStyles(_theme => ({
  unauthenticated: {
    textAlign: 'center',
    marginTop: 35,
    maxHeight: 589,
    overflowY: 'hidden',
  },
  always: {
    textAlign: 'center',
    marginTop: 10,
  },
  signedIn: {
    textAlign: 'center',
    marginTop: 40,
  },
  amplifySignOut: {
    width: 'fit-content',
    margin: 'auto',
    marginTop: 20,
  },
}));

const Home = () => {

  const classes = useStyles();

  const { authData, nextAuthState } = useApp()!;

  const rendersAlways = () => (
    <div className={classes.always}>
      <Typography variant="overline">
        Shows according the auth state
      </Typography>
    </div>
  )

  const renderLoading = () => (<>
    <Loading />
    <MyAmplifyAuthenticator /> {/* Force react to evaluate AmplifyAuthenticator when we're still waiting for auth state, it doesn't show  */}
  </>)

  const renderSignedIn = () => (
    <div className={classes.signedIn}>
      <Typography variant="h4" gutterBottom>
        Welcome {authData.attributes.name}!
      </Typography>
      <div className={classes.amplifySignOut}>
        <AmplifySignOut />
      </div>
    </div>
  )

  const renderUnauth = () => (
    <div className={classes.unauthenticated}>
      <Typography variant="h4" gutterBottom>
        Hello stranger!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Login so I can welcome you!
      </Typography>
      <MyAmplifyAuthenticator />
    </div>
  )

  return <>

    {rendersAlways()}

    {!nextAuthState? <>
      {renderLoading()}
    </> : nextAuthState === AuthState.SignedIn && authData? <>
      {renderSignedIn()}
    </> : <>
      {renderUnauth()}
    </>}

  </>
};
export default Home;
