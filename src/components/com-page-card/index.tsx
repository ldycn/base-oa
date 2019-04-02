import React from 'react';
import style from './src/style.jss.tsx'
import Component from './src';
import { createStyles, Theme, withStyles, WithStyles, withTheme } from '@material-ui/core/styles';

const styles = (theme: Theme) => {
  return createStyles(style)
}
export default  <Component classes={{ card: 'asfasfasf'}} />;