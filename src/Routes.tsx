import React, {ReactElement} from 'react';
import Demo from './main/Demo/App';
import Home from './main/Home';
import {
  Switch,
  Route,
} from "react-router-dom";
import {
  FaReact,
  ImHome3,
  GrTextAlignLeft,
  MdPerson,
} from "react-icons/all";
import Paragraphs from "./main/Paragraphs";
import Login from "./main/Login";
import Site from "./layout/Site";
import AuthenticatedRoute from "./component/AuthenticatedRoute";
import UnauthenticatedRoute from "./component/UnauthenticatedRoute";

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
    to: '/demo',
    text: 'Demo',
    icon: <FaReact />,
  },
  {
    to: '/login',
    text: 'Login',
    icon: <MdPerson />,
  },
];

const Routes: React.FC<{}> = () => {

  return (
    <Site sections={sections}>
      <Switch>

        <Route exact path='/paragraphs'>
          <Paragraphs style={padding} />
        </Route>
        <AuthenticatedRoute exact path='/demo'>
          <Demo />
        </AuthenticatedRoute>
        <UnauthenticatedRoute exact path='/login'>
          <Login />
        </UnauthenticatedRoute>

        <Route path='/'>
          <Home />
        </Route>

      </Switch>
    </Site>
  );
};

export let defaultSection: Section = sections[0];
export default Routes;
