import React from 'react';
import PropTypes from 'prop-types';
import MaterialUIForm from 'react-material-ui-form';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';

import { styles } from '../theme';

class UserInfoForm extends React.Component {
  state = { error: undefined };

  submit = (values, pristineValues) => {
    if (values.password !== values.password2) {
      this.setState({ error: 'Passwords must match' });
    } else {
      this.props.onSubmit(values, pristineValues);
    }
  };

  render() {
    const { onSubmit, classes, error } = this.props;
    const formClass = [classes.form, classes.container].join(' ');

    return (
      <MaterialUIForm onSubmit={onSubmit} className={formClass}>
        <Typography variant="subtitle1">Enter Account Details</Typography>
        <TextField
          label="Username"
          name="username"
          type="text"
          value=""
          variant="outlined"
          data-validator="isRequired"
          className={classes.textField}
        />
        <TextField
          label="Real Name"
          name="realName"
          type="text"
          value=""
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value=""
          variant="outlined"
          data-validator="isRequired"
          className={classes.textField}
        />
        <TextField
          label="Password (confirm)"
          name="password2"
          type="password"
          value=""
          variant="outlined"
          data-validator="isRequired"
          className={classes.textField}
        />
        <Typography color="error" align="center" className={classes.textField}>
          {error || this.state.error}
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
      </MaterialUIForm>
    );
  }
}
export default withStyles(styles)(UserInfoForm);

UserInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  error: PropTypes.node
};

UserInfoForm.defaultProps = {
  error: undefined
};
