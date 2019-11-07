import {connect} from 'react-redux';

import OperatingPictureComponent from '../../components/intel_request/OperatingPictureComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(OperatingPictureComponent);
