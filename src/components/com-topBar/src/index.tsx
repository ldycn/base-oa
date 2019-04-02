/*
*  组件
* */
import React from 'react';
import PropTypes from 'prop-types';
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
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  More as MoreIcon
} from "@material-ui/icons";
import { WithStyles } from '@material-ui/core/styles';
import { withTranslation, WithTranslation  } from 'react-i18next'; //*如果需要用到 语言国际化*/

export interface Props extends WithStyles, WithTranslation {
  data?: [],
  tableTop?: string[],
  ShowLeftFn: any
}

class Tables extends React.Component<Props> {
  showNavLeft = () => {
    this.props.ShowLeftFn(true)
  }
  render() {
    const {classes, data, tableTop, i18n} = this.props
    return (
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <IconButton color="inherit" onClick={this.showNavLeft.bind(this)}>
            <MenuIcon />
          </IconButton>
          <Typography color="inherit">
            {i18n.t("Welcome")}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={i18n.t("searchPlaceholder")}
              classes = {{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <div className={classes.grow} />
          <div className="secondDeskTop">
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MoreIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}
(Tables as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

//withTranslation 监听i18n 变化 组件重新渲染
export default withTranslation()(Tables)
