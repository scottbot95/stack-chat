import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialUIForm from 'react-material-ui-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import { signup } from '../store/user/actions';
import { setTitle } from '../store/window/actions';
import { styles, theme } from '../theme';
import UserInfoForm from './UserInfoForm';

class SignupPage extends React.Component {
  componentDidMount() {
    this.props.setWindowTitle('Account Creation');
  }

  state = { error: undefined };

  submit = values => {
    if (values.password === values.password2) {
      this.props.signup(values);
    } else {
      this.setState({ error: "Passwords don't match" });
    }
  };

  render() {
    const { error, classes } = this.props;

    return (
      <Paper className={[classes.container, classes.center].join(' ')}>
        <Card>
          <UserInfoForm error={error} onSubmit={this.submit} />
          <Typography align="center" variant="caption">
            Already have an account?
            <Link to="/" style={{ padding: theme.spacing.unit }}>
              Click here to login
            </Link>
          </Typography>
        </Card>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  error: state.user.error && state.user.error.response.data
});

const mapDispatchToProps = {
  signup,
  setWindowTitle: setTitle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignupPage));

SignupPage.propTypes = {
  /** error text to display, if any */
  error: PropTypes.string,
  /** Thunk to send login information */
  signup: PropTypes.func.isRequired,
  setWindowTitle: PropTypes.func.isRequired,
  /** styles from material ui */
  classes: PropTypes.object.isRequired
};

SignupPage.defaultProps = {
  error: undefined
};
