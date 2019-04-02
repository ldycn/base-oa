/*
*  组件
* */
import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Avatar,
  ListItemIcon,
  SwipeableDrawer,
  Typography
} from '@material-ui/core';
import {
  ExpandLess,
  ExpandMore,
  Computer as ComputerIcon,
  Speaker as SpeakerIcon,
  Compare as CompareIcon,
  Mail as MailIcon,
  StarBorder,
  Star as StarIcon,
  Notifications as NotificationsIcon,
} from "@material-ui/icons";
import { WithStyles } from '@material-ui/core/styles';

import i18n from "i18next"; /*如果需要用到 语言国际化*/

interface State {
  opens:  Array<any>
}
export interface Props extends WithStyles {
  data: any [], /*列表*/
  tableTop?: string[],
  isShowLeft?: any,
  ShowLeftFn: any
}

class navBar extends React.Component<Props, State> {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  static defaultProps = {
    data: [
      {
        text: "home1",
        icon: MailIcon,
        path: "/desktop/home1",
        children: [
          {
            text: "home1-1",
            icon: StarIcon,
            path: "/desktop/home1/home1-1",
          },
          {
            text: "home1-2",
            icon: StarIcon,
            path: "/desktop/home1/home1-2",
          }
        ]
      },
      {
        text: "home2",
        icon: ComputerIcon,
        path: "/desktop/home2"
      },
      {
        text: "home3",
        icon: SpeakerIcon,
        path: "/desktop/home3"
      },
      {
        text: "home4",
        icon: CompareIcon,
        path: "/desktop/home4"
      }
    ]
  }
  state: State = {
    opens: []
  }
  toggleDrawer = ( open: boolean) => {
    this.props.ShowLeftFn(open);
  }
  itemClick = (item: any, index?: any) => {
    if (index !== undefined) {
      let findIndex = this.state.opens.indexOf(index);
      if (findIndex === -1) {
        this.state.opens.push(index)
      } else {
        this.state.opens.splice(findIndex, 1);
      }
      this.setState({});
    }
    if (!item.children || item.children.length === 0) {
      this.toggleDrawer(false);
      this.context.router.history.push(item.path);
    }
  };
  isShowChilren = (item: any): boolean =>{
      return item.children && item.children.length
  }
  render() {
    const {classes, data, tableTop, isShowLeft} = this.props;
    const { opens } = this.state;
    return (
      <SwipeableDrawer open={isShowLeft}
                       onClose={this.toggleDrawer.bind(this,false)}
                       onOpen={this.toggleDrawer.bind(this,true)}
      >
        <div className="navBarTop">
          <StarIcon />
          <Typography variant="h6">基地OA办公系统</Typography>
        </div>
        <List className={classes.root}>
          {
            data.map((item, index: number) => {
              return (
                  <div key={index}>
                    <ListItem key={index} button className={classes.item} onClick={this.itemClick.bind(this, item, index)}>
                      <Avatar>
                        <item.icon />
                      </Avatar>
                      <ListItemText primary={item.text}/>
                      {this.isShowChilren(item) ? opens.indexOf(index) !== -1 ? <ExpandLess /> : <ExpandMore /> : ""}
                    </ListItem>
                    {
                      this.isShowChilren(item) ? <Collapse in={opens.indexOf(index) !== -1} timeout="auto" unmountOnExit>
                        <List disablePadding>
                          {
                            item.children.map((item1: any, index1: number) => {
                              return <ListItem key={index1} button onClick={this.itemClick.bind(this, item1)}>
                                <ListItemIcon>
                                  <item1.icon />
                                </ListItemIcon>
                                <ListItemText inset primary={item1.text} />
                              </ListItem>
                            })
                          }
                        </List>
                      </Collapse>: ""
                    }
                  </div>
              )
            })
          }
        </List>
      </SwipeableDrawer>
      
    )
  }
}
(navBar as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default navBar
