import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import MovieForm from "./components/movieForm";
class App extends Component {
  render() {
    return (
      <div className="container">
        {/* adding the basename prop fixes the problem of no rendered content on github pages
      https://medium.com/@Dragonza/react-router-problem-with-gh-pages-c93a5e243819 */}
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/" component={Movies} />
            {/* <Redirect from="/" exact to="/movies" /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
