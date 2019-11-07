import {connect} from 'react-redux';

import LoginComponent from '../components/LoginComponent';
import { login } from 'actions/auth';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
    isLoading: state.auth.isFetching,
    loginData: state.auth.loginData,
    authenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
