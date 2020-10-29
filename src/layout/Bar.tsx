import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import {
  MdMenu,
} from "react-icons/all";
import {useApp} from "./Site";
import {AmplifySignOut} from "@aws-amplify/ui-react";

const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  authenticated: {
    textAlignLast: 'start',
  },
  amplifySignOut: {
    width: 105,
    overflow: 'hidden',
    verticalAlign: 'middle',
    display: 'inline-block',
    marginLeft: 10,
  },
}));

type Props = {
  handleDrawerOpen: () => void
  open: boolean
};

const Bar: React.FC<Props> = ({handleDrawerOpen, open}) => {

  const classes = useStyles();

  const { isAuthenticated, authData } = useApp()!;

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MdMenu />
        </IconButton>
        <Typography variant="h6" noWrap style={{flexGrow: 1}}>
          Mini variant drawer
        </Typography>

        { isAuthenticated && authData?
            <div className={classes.authenticated}>
              <span>Hello {authData.attributes?.name} 👋</span>
              <div className={classes.amplifySignOut}>
                <AmplifySignOut />
              </div>
            </div>
          :
            <span>You're not logged in</span>
        }
      </Toolbar>
    </AppBar>
  )
};

export default Bar;
