import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AppliedRoute({ component: C, appProps, auth, ...rest }) {
  if(auth==="true" && !appProps.activeUser.loaded) {
    return (< Redirect to={{ pathname: "/login" }}/>);
  } else {
    return ( <Route {...rest} render={props => <C {...props} {...appProps} />} />);
  }
}
