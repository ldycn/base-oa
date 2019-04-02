import React, { Component } from "react";
import { Router, Route, Switch, Redirect, RouteComponentProps  } from "react-router-dom";
import { createStyles, Theme, withStyles, WithStyles, withTheme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import HomeTop from "../../../components/com-topBar/index"
import HomeLeft from "../../../components/com-navBar"
import ReRoute from "../../../componentsUnit/reRoute"
interface State {
  isShowLeft?: boolean
}
export interface Props extends RouteComponentProps {}
class Home extends React.Component <Props, State>{
  state: State = {
    isShowLeft: false
  }
  isShowLeftFn = (show: boolean) : void => {
    this.setState({
      isShowLeft: show
    })
  }
  render() {
    return (
      <Paper>
        <HomeTop ShowLeftFn={this.isShowLeftFn} />
        <div className="main">
          <div className="left">
            <HomeLeft
              isShowLeft={this.state.isShowLeft}
              ShowLeftFn={this.isShowLeftFn}
            />
          </div>
          <div className="content">
            <ReRoute {...this.props} />
          </div>
        </div>
      </Paper>
    );
  }
}

export default Home