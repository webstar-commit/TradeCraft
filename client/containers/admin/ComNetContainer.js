import {connect} from 'react-redux';

import ComNetComponent from '../../components/admin/ComNetComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(ComNetComponent);
