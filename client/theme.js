import { createMuiTheme } from '@material-ui/core';
import createStyles from '@material-ui/styles/createStyles';
import purple from '@material-ui/core/colors/purple';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500]
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
    height: '100%'
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
    width: drawerWidth
  },
  dialogPaper: {
    overflowY: 'visible!important'
  }
});
