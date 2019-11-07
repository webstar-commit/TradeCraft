import {connect} from 'react-redux';

import AdminComponent from '../components/AdminComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    roles: state.auth.userRoles
  };
};

export default connect(mapStateToProps)(AdminComponent);
