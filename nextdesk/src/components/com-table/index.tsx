import style from './src/style.jss.tsx'
import Component from './src';
import simpleHoc from "../../componentsHi/hi"
import { createStyles, Theme, withStyles, WithStyles, withTheme } from '@material-ui/core/styles';

const styles = (theme: Theme) => {
  return createStyles(style)
}
// export default  simpleHoc(withStyles(styles)(Component));
export default  simpleHoc(withStyles(styles)(Component));