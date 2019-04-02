import React, { Component } from "react";
import { Router, Route, Switch, Redirect, RouteComponentProps } from "react-router-dom";
import { createStyles, Theme, withStyles, WithStyles, withTheme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Table from "../../../components/com-table/index";
import request from "../../../service/request"
import ReRoute from "../../../componentsUnit/reRoute"
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
    request.get("/test.php").then((records) => {
      console.log(records)
    }).catch((error) => {
    })
  }
  render() {
    return (
      <Paper>
        <Table name="这是一个高阶组件1" />
        <ReRoute {...this.props} />
      </Paper>
      
    );
  }
}

export default Home