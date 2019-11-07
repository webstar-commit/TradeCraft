import {connect} from 'react-redux';

import IsrSyncComponent from '../../components/mission_mgt/IsrSyncComponent';
import { fetchCollectionPlans, fetchATOGeneration  } from 'actions/mssionmgt';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
  };
};

const mapDispatchToProps = {
  fetchCollectionPlans,
  fetchATOGeneration,
};

export default connect(mapStateToProps, mapDispatchToProps)(IsrSyncComponent);
