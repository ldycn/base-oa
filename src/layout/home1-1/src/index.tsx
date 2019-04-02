import React, { Component } from "react";
import { Router, Route, Switch, Redirect, RouteComponentProps } from "react-router-dom";
import { createStyles, Theme, withStyles, WithStyles, withTheme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
interface State {
  isShowLeft?: boolean
}
interface Props extends RouteComponentProps{
}

class Home extends React.Component <Props, State>{
  state: State = {
    isShowLeft: false
  }
  componentWillMount() {
  }
  render() {
    return (
      <h1>page 1-1</h1>
    );
  }
}

export default Home