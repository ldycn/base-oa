/***
 * Route 重封装 权限控制
 *
 * props {
 *
 * }
 */
import React, { Component } from "react";
import { Route, Redirect ,RouteProps, Prompt } from "react-router-dom";
export interface propsModel {
  is404: boolean
}
interface Props extends RouteProps {
  path: string,
  component: React.ComponentClass,
  name: string
}
class FrontendAuth extends React.Component<Props, propsModel> {
  render() {
    const { path, name } = this.props;
    const Component = this.props.component
    return <Route path={path} render={
      (props) => {
        /*路由权限判断 这儿*/
        //return <Redirect to="/page404"/>
        // return <Prompt when={true} message={
        //   (location) => {
        //     debugger
        //     return false
        //   }
        // } />
        return <Component {...props} />
      }
    }/>
  }
}

export default FrontendAuth