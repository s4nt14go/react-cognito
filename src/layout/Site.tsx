import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Section} from "../Routes";
import Drawer from './Drawer';
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";
import { Hub } from "aws-amplify";
import {Snackbar} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  snackbar: {
    top: 'calc(-100% + 222px)',
    right: 0,
    transform: 'unset',
  },
}));

type Props = {
  sections: Section[]
  children: React.ReactNode
};

type AppContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  nextAuthState: AuthState | undefined
  authData: any
};
const AppContext = React.createContext<AppContextType | undefined>(
  undefined
);
export const useApp = () => React.useContext(AppContext);

const Site = ({ children, sections }: Props) => {

  const classes = useStyles();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nextAuthState, setNextAuthState] = React.useState<AuthState>();
  const [authData, setAuthData] = React.useState<any>();

  type Severity = 'success' | 'error' | 'info';
  const [feedback, setFeedback] = useState({
    open: false,
    severity: 'success' as Severity,
    text: '',
  });
  function handleClose() {
    setFeedback(s => ({...s, open: false}));
  }

  React.useEffect(() => {

    Hub.listen("auth", res => {
      let msg = res.payload.data.message || res.payload.message || JSON.stringify(res.payload.data);  // Para el caso en que creo una cuenta con un email ocupado res.payload.data.message (An account with the given email already exists) es más explicativo que res.payload.message (<email> failed to signup) DE TOODAS FORMAS ese mensaje ya aparece arriba en una ribbon azul automáticamente así que en este caso convendría no mostrar nada
      let severity = 'info';
      let showToast;
      switch (res.payload.event) {  // Many events are informed with amplify built-in toast (signIn_failure), here I handle those which it doesn't
        case 'signUp' || 'forgotPassword':
          // In this case msg is '{email} has signed up successfully' which is misleading as the user still has to verify their email so I overwrite it
          msg = `Fill in the code sent to ${res.payload.data.user.username}`;
          showToast = true;
          break;
        case 'signIn':
          msg = `${res.payload.data.attributes.name} signed in successfully!`;
          severity = 'success';
          showToast = true;
          break;
        case 'signIn_failure':
          if (res.payload.data.code === "UserNotConfirmedException") {
            showToast = true;
          }
          break;
        case 'confirmSignUp':
          msg = `${res.payload.data.attributes.name} signed up successfully!`;
          severity = 'success';
          showToast = true;
          break;
        // case 'signOut' || 'forgotPassword': signOut and forgotPassword will refresh the page so there is no sense to show toast
        default:
          showToast = false;
      }

      if (showToast) setFeedback({
        open: true,
        severity: severity as Severity,
        text: msg,
      });
    })
  }, []);

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setNextAuthState(nextAuthState);
      if (nextAuthState === 'signedout') {
        setIsAuthenticated(false);
      } else if (nextAuthState === 'signedin') {
        if (authData) {
          setAuthData(authData);
          setIsAuthenticated(true);
        }
      }
    });
  }, []);

  return (<div className={classes.root}><CssBaseline />

    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, nextAuthState, authData }}>
      <Drawer sections={sections} toolbarClass={classes.toolbar} />

      <main style={{flexGrow: 1}}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </AppContext.Provider>

    <Snackbar open={feedback.open}  onClose={handleClose} className={classes.snackbar} autoHideDuration={4000}>
      <Alert onClose={handleClose} severity={feedback.severity}>
        {feedback.text}
      </Alert>
    </Snackbar>

  </div>)
};

export default Site;
