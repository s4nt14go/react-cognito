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
} from "react-icons/all";
import Paragraphs from "./main/Paragraphs";
import Site from "./layout/Site";

const padding = {
  padding: 24,
};

export type Section = {
  to: string
  text: string
  icon: ReactElement
  main: ReactElement
  padding?: boolean
  style?: any
}

export let sections: Section[] = [
  {
    to: '/home',
    text: 'Home',
    icon: <ImHome3 />,
    main: <Home />,
  },
  {
    to: '/paragraphs',
    text: 'Paragraphs',
    icon: <GrTextAlignLeft />,
    main: <Paragraphs style={padding} />,
  },
  {
    to: '/demo',
    text: 'Demo',
    icon: <FaReact />,
    main: <Demo />
  },
];

const Routes: React.FC<{}> = () => {

  return (
    <Site sections={sections}>
      <Switch>

        {sections.map((section, _index) => (
          <Route path={section.to} key={section.text}>
            {section.main}
          </Route>
        ))}

        <Route path='/' key={defaultSection.text}>
          {defaultSection.main}
        </Route>

      </Switch>
    </Site>
  );
};

export let defaultSection: Section = sections[0];
export default Routes;
