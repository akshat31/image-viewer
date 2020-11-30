import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./screens/header/header";
import { Home } from "./screens/home/home";
import { Login } from "./screens/login/login";
import { Profile } from "./screens/profile/profile";

function App() {
  return (
    <Router>
      <Header />
      <div className='container'>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
