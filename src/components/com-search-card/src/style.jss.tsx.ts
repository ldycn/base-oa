import { Theme  } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  searchCard: {
    width: '100%',
    backgroundColor: '#F8F8FA',
  },
  buttonRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  iconButton: {
    marginLeft: '10px',
  }
});

export default styles;