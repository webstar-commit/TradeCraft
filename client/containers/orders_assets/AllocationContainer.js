import {connect} from 'react-redux';

import AllocationComponent from '../../components/orders_assets/AllocationComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(AllocationComponent);
