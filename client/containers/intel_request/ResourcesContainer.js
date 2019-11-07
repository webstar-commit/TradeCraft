import {connect} from 'react-redux';

import ResourcesComponent from '../../components/intel_request/ResourcesComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(ResourcesComponent);
