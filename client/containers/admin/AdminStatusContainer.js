import {connect} from 'react-redux';

import AdminStatusComponent from '../../components/admin/AdminStatusComponent';
import { fetchPlatformsStatus, fetchPayloadsStatus, fetchPersonnelsStatus, fetchMunitionsStatus } from 'actions/status';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    statusplatform:state.status.platforms,
    statuspayload:state.status.payloads,
    statuspersonnel:state.status.personnels,
    statusmunition:state.status.munitions,
    isLoading: state.status.isFetching,    
  };
};

const mapDispatchToProps = {
  fetchPlatformsStatus,
  fetchPayloadsStatus,
  fetchPersonnelsStatus,
  fetchMunitionsStatus
};

export default connect(mapStateToProps,mapDispatchToProps)(AdminStatusComponent);
