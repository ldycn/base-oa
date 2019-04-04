/***
 * 包含switch 的组件
 *
 * props {
 *   @routerPageName? routers/pages 下文件名称 如果无 则匹配 该页面所在路由下的名称
 *   todo 例如 该页面所在的路由是 /desktop/home1
 *
 * }
 */
import React, { Component } from "react";

import { Router, Route, Switch, Redirect, RouteComponentProps, withRouter  } from "react-router-dom";
import FrontendAuth from '../../FrontendAuth';
import pageArr, { getRelatevePage } from '../../../routers/index'
export interface Props extends React.Component{
  routerPageName?: string,
  [name: string]: any
}
class reRoute extends React.Component<Props> {
  componentWillMount() {
  }
  render() {
    debugger
    const { match, routerPageName } = this.props;
    const PageRouterMap = pageArr[routerPageName? routerPageName : getRelatevePage(match.url)];
    return (
      <Switch>
        {
          (PageRouterMap && PageRouterMap.length > 0)
            ? PageRouterMap.map((child, index) =>{
              return <FrontendAuth key={index} path={(match ? match.url: "") + child.path} component={child.component} name={child.name} />
            }) : ""
        }
        {/* {match ? <Redirect from={match.path} to={match.path} />: ""} */}
        {this.props.children}
      </Switch>
    );
  }
}

export default reRoute