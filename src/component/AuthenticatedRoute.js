import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import {useApp} from "../layout/Site";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useApp();
  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={
          `/login?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}
