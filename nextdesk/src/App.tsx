import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Router, Switch, Redirect, Route  } from "react-router-dom";
import ReRoute from "./componentsUnit/reRoute"
import { p404 } from './routers/pages/main'

const hist = createBrowserHistory();

export const App: React.SFC<{}> = () => {
    return (
        <Router history={hist}>
          <ReRoute routerPageName="main" >
            <Route path="/page404" component={p404}></Route>
            <Redirect from="/" to="/desktop" />
          </ReRoute>
        </Router>
    );
};
