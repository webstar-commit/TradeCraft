import {connect} from 'react-redux';

import SysConfigComponent from '../../components/admin/SysConfigComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(SysConfigComponent);
