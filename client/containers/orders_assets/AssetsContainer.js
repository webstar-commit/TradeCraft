import {connect} from 'react-redux';

import AssetsComponent from '../../components/orders_assets/AssetsComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(AssetsComponent);
