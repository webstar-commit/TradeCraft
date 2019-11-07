import { fetchMissionSummary } from 'actions/mssionmgt';

import { connect } from 'react-redux';
import MissionSummaryComponent from '../../components/mission_mgt/MissionSummaryComponent';


const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allMissionSummary: state.mssionmgts.allMissionSummary,
    isLoading: state.mssionmgts.isFetching,
    //isDeleted: state.platforminventory.isDeleted
  };
};

const mapDispatchToProps = {
  fetchMissionSummary,
};

export default connect(mapStateToProps, mapDispatchToProps)(MissionSummaryComponent);
