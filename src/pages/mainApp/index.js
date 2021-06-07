import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../../components/molecules";
import "./mainApp.scss";
import Home from "../Home";
import ItemDetail from "../ItemDetail";
import Login from "../Login";
import MyEvent from "../MyEvent";
import SavedEvent from "../SavedEvent";
import RegisteredEvent from "../RegisteredEvent";

function MainApp() {
  return (
    <div className="main-app wrapper">
      <Header />

      <div className="content-wrapper">
        <Router>
          <Switch>
            <Route path="/registered-event">
              <RegisteredEvent />
            </Route>
            <Route path="/saved-event">
              <SavedEvent />
            </Route>
            <Route path="/myevent">
              <MyEvent />
            </Route>
            <Route path="/item-detail/:id">
              <ItemDetail />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default MainApp;
