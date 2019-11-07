import {connect} from 'react-redux';

import LiveViewComponent from '../components/LiveViewComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(LiveViewComponent);
