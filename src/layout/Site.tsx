import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Section} from "../Routes";
import Drawer from './Drawer';

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
  }
}));

type Props = {
  sections: Section[]
  children: React.ReactNode
};

type AppContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
};
const AppContext = React.createContext<AppContextType | undefined>(
  undefined
);
export const useApp = () => React.useContext(AppContext);

const Site = ({ children, sections }: Props) => {

  const classes = useStyles();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (<div className={classes.root}><CssBaseline />

    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Drawer sections={sections} toolbarClass={classes.toolbar} />

      <main style={{flexGrow: 1}}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </AppContext.Provider>
  </div>)
};

export default Site;
