import {connect} from 'react-redux';
import  { Redirect } from 'react-router-dom'

import HeaderComponent from '../components/HeaderComponent';
import { updateLocalization } from 'actions/localization';
import { logout } from 'actions/auth';

const mapStateToProps = state => {
  return {
    router: state.router,
    translations: state.localization.staticText
  };
};

const mapDispatchToProps = {
  updateLocalization,
  logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
