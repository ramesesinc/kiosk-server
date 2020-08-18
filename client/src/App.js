import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import HomeScreen from "./app/HomeScreen";
import PluginScreen from "./app/PluginScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route name="home" exact path="/" component={HomeScreen} />
        <Route name="plugin" path="/plugin" component={PluginScreen} />
      </Switch>
    </Router>
  );
}

export default App;
