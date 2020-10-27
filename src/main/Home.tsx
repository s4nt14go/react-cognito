import React from "react";
import {useApp} from '../layout/Site';

type Props = {
  style: object
}

const Home = ({ style }: Props) => {

  const { isAuthenticated, setIsAuthenticated } = useApp()!;

  return <div style={style}>
    <h2>Home</h2>
    <p>{isAuthenticated.toString()}</p>
    <button onClick={_e => {setIsAuthenticated(!isAuthenticated)}}>press</button>
  </div>;
};
export default Home;
