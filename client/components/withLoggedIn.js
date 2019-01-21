import { connect } from 'react-redux';

const mapState = state => ({
  isLoggedIn: !!state.user.id
});

export default connect(mapState);
