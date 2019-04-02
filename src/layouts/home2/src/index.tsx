import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createStyles, Theme, withStyles, WithStyles, withTheme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Echars from "../../../components/com-echarts/index"
interface State {
  isShowLeft?: boolean
}
interface Props {

}
class Home extends React.Component <Props, State>{
  state: State = {
    isShowLeft: false
  }
  render() {
    return (
      <Echars />
    );
  }
}

export default Home