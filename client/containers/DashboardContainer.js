import { connect } from 'react-redux';

import DashboardComponent from '../components/DashboardComponent';
import { fetchOPSUtilizationPayload, fetchOPSUtilizationPlatform, fetchOPSUtilizationMission, fetchAISROpreationStatus,
  fetchLatestIntelligence, fetchUpcomingMission, fetchLiveOperation } from 'actions/dashboard';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    opsPlatform: state.dashboards.opsPlatform,
    opsPayload: state.dashboards.opsPayload,
    opsMissions: state.dashboards.opsMission,
    aisrOperation: state.dashboards.aisrOperation,
    allLatestIntelligence: state.dashboards.latestIntelligence,
    allUpcomingMissions: state.dashboards.upcomingMissions,
    allLiveOperations: state.dashboards.liveOperations,
    isLoading: state.dashboards.isFetching,
  };
};

const mapDispatchToProps = {
  fetchOPSUtilizationPayload,
  fetchOPSUtilizationPlatform,
  fetchOPSUtilizationMission,
  fetchAISROpreationStatus,
  fetchLatestIntelligence,
  fetchUpcomingMission,
  fetchLiveOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
