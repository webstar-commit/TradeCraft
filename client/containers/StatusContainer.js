import {connect} from 'react-redux';

import StatusComponent from '../components/StatusComponent';
import { fetchPlatformsStatus, fetchPayloadsStatus, fetchPersonnelsStatus, fetchMunitionsStatus, fetchUnitLogo } from 'actions/status';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    statusplatform:state.status.platforms,
    statuspayload:state.status.payloads,
    statuspersonnel:state.status.personnels,
    statusmunition:state.status.munitions,
    logo:state.status.logo,
    isLoading: state.status.isFetching, 
  };
};

const mapDispatchToProps = {
  fetchPlatformsStatus,
  fetchPayloadsStatus,
  fetchPersonnelsStatus,
  fetchMunitionsStatus,
  fetchUnitLogo
};

export default connect(mapStateToProps,mapDispatchToProps)(StatusComponent);
