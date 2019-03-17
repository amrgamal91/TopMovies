import React, { Component } from "react";

import "./App.css";
import Movies from "./components/movies";
import { Route, Redirect, Switch } from "react-router-dom";
import MovieForm from "./components/movieForm";
class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Redirect from="/" exact to="/movies" />
        </Switch>
      </div>
    );
  }
}

export default App;
