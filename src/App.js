import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./screens/home/home";
import { Profile } from "./screens/profile/profile";
import { Login } from "./screens/login/login";
import { requireAuth } from './require-auth';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" render={(props) => requireAuth(<Home {...props}/>)} />
          <Route exact path="/profile" render={(props) => requireAuth(<Profile {...props}/>)} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
