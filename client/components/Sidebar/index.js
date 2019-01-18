import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import withWidth from '@material-ui/core/withWidth';

const mapStateToProps = state => ({
  channels: state.channels
});

export default connect(mapStateToProps)(withWidth(Sidebar));
