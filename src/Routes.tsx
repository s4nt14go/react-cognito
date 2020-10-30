import React, {ReactElement} from 'react';
import Home from './main/Home';
import {
  Switch,
  Route,
} from "react-router-dom";
import {
  ImHome3,
  GrTextAlignLeft,
  IoMdLogIn,
  IoIosPerson,
} from "react-icons/all";
import Paragraphs from "./main/Paragraphs";
import Login from "./main/Login";
import Site from "./layout/Site";
import AuthenticatedRoute from "./component/AuthenticatedRoute";
import UnauthenticatedRoute from "./component/UnauthenticatedRoute";
import Profile from "./main/Profile";

const padding = {
  padding: 24,
};

export type Section = {
  to: string
  text: string
  icon: ReactElement
}

export let sections: Section[] = [
  {
    to: '/',
    text: 'Home',
    icon: <ImHome3 />,
  },
  {
    to: '/paragraphs',
    text: 'Paragraphs',
    icon: <GrTextAlignLeft />,
  },
  {
    to: '/login',
    text: 'Login',
    icon: <IoMdLogIn />,
  },
  {
    to: '/profile',
    text: 'Profile',
    icon: <IoIosPerson />,
  },
];

type Props = {}

const Routes: React.FC<Props> = () => {

  return (
    <Site sections={sections}>
      <Switch>

        <Route exact path='/paragraphs'>
          <Paragraphs style={padding} />
        </Route>
        <UnauthenticatedRoute exact path='/login'>
          <Login />
        </UnauthenticatedRoute>
        <AuthenticatedRoute exact path='/profile'>
          <Profile />
        </AuthenticatedRoute>

        <Route path='/'>
          <Home />
        </Route>

      </Switch>
    </Site>
  );
};

export let defaultSection: Section = sections[0];
export default Routes;
