import React from 'react';
import MaterialUIForm from 'react-material-ui-form';
import withStyles from '@material-ui/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { theme, styles } from '../../theme';
import { messageSocket } from '../../socket';

const MessageInput = ({ classes, authorId, channelId }) => {
  const submit = event => {
    event.preventDefault();
    const text = event.currentTarget.text.value;
    event.currentTarget.text.value = '';
    messageSocket.emit('new-message', { text, authorId, channelId });
  };

  return (
    <Paper square>
      <form
        onSubmit={submit}
        className={[classes.flex, classes.padding].join(' ')}
      >
        <TextField
          label="Message"
          name="text"
          type="text"
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
      </form>
    </Paper>
  );
};

export default withStyles(styles)(MessageInput);
