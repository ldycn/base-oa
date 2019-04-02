import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import actions from "../../../Redux/actions/actions";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Avatar
} from '@material-ui/core';

const { changeEnglish, changeChinese } = actions;
interface State {
  isShowLeft?: boolean
}
interface Props {
  counter: any,
  changeChinese: any,
  changeEnglish: any
}
class Home extends React.Component <Props, State>{
  state: State = {
    isShowLeft: false
  }
  componentWillMount() {
  }
  render() {
    const {counter, changeChinese, changeEnglish} = this.props
    return (
      <div>
        <div>{counter}</div>
        <IconButton onClick={changeEnglish} >en</IconButton>
        <IconButton onClick={changeChinese} >cn</IconButton>
      </div>
    );
  }
}
function mapStateToProps(state: any, ownProps: any) {
  return state
}
function mapDispatchToProps (dispatch: any, ownProps: any) {
   return {
     changeEnglish: changeEnglish(dispatch),
     changeChinese: changeChinese(dispatch)
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)