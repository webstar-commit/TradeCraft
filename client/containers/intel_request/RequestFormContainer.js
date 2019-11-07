import {connect} from 'react-redux';

import RequestForm from '../../components/intel_request/RequestForm';
import { addIntelEei, addIntelRequest, updateIntelStatus } from 'actions/intel';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    isStatusUpdated: state.intelrequest.isStatusUpdated,
  };
};

const mapDispatchToProps = {
  addIntelEei,
  addIntelRequest,
  updateIntelStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
