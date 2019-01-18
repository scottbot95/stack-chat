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

export const styles = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
    // padding: theme.spacing.unit
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    alignItems: 'center'
  },
  textField: {
    flexGrow: 0,
    width: 300
  },
  submit: {
    marginTop: `${theme.spacing.unit}px!important`,
    margin: 'auto!important'
  }
});
