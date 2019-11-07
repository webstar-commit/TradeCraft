import {connect} from 'react-redux';

import ChangePasswordComponent from '../components/ChangePasswordComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(ChangePasswordComponent);
