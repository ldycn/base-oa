import styles from './src/style.jss.tsx'
import Component from './src';
import { withStyles } from '@material-ui/core/styles';

export default  withStyles(styles)(Component as any);