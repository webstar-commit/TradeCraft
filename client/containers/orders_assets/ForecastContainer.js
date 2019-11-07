import {connect} from 'react-redux';

import ForecastComponent from '../../components/orders_assets/ForecastComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(ForecastComponent);
