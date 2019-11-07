import {connect} from 'react-redux';

import CurrentIntelComponent from '../../components/intel_request/CurrentIntelComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(CurrentIntelComponent);
