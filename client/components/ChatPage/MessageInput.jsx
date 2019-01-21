import React from 'react';
import MaterialUIForm from 'react-material-ui-form';
import withStyles from '@material-ui/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { theme, styles } from '../../theme';

const MessageInput = ({ classes }) => {
  const submit = values => {};

  return (
    <Paper square>
      <MaterialUIForm
        onSubmit={submit}
        className={[classes.flex, classes.padding].join(' ')}
      >
        <TextField
          label="Message"
          name="message"
          type="text"
          value=""
          className={classes.grow}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={{ margin: theme.spacing.unit }}
        >
          Send
        </Button>
      </MaterialUIForm>
    </Paper>
  );
};

export default withStyles(styles)(MessageInput);
