import {connect} from 'react-redux';

import OrdersComponent from '../../components/orders_assets/OrdersComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(OrdersComponent);
