import { createMuiTheme } from '@material-ui/core';
import createStyles from '@material-ui/styles/createStyles';
import purple from '@material-ui/core/colors/purple';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8860D0'
    },
    secondary: {
      main: '#5680E9'
    },
    background: {
      default: '#C1C8E4'
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;

const drawerWidth = 200;

export const styles = createStyles({
  flex: {
    display: 'flex'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: `${theme.palette.background.default}!important`
    // padding: theme.spacing.unit
  },
  background: {},
  content: {
    padding: theme.spacing.unit * 2
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
    boxSizing: 'border-box'
  },
  padding: {
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1
  },
  textField: {
    flexGrow: 0,
    width: 300,
    marginTop: `${theme.spacing.unit}px!important`
  },
  submit: {
    marginTop: `${theme.spacing.unit}px!important`,
    margin: 'auto!important'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: `${theme.palette.secondary.main}!important`
  },
  dialogPaper: {
    overflowY: 'visible!important'
  },
  messageInputPaper: {
    backgroundColor: `#5AB9EA!important`
  }
});
