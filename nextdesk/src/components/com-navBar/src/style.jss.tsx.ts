/**
 * 样式文件
 */
import { createStyles, Theme  } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
const styles = (theme: Theme) => {
  debugger
  return createStyles({
    root: {
      width: "100%",
      maxWidth: 300,
      background: theme.palette.background.paper,
    }
  })
}

export default styles