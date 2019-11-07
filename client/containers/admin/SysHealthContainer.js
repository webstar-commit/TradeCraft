import {connect} from 'react-redux';

import SysHealthComponent from '../../components/admin/SysHealthComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(SysHealthComponent);
