import { connect } from 'react-redux';

import AtoComponent from '../../components/mission_mgt/AtoComponent';
import { fetchATOGenerations, fetchATOCollectionPlans, routeATOGeneration
  , moveToATOGenerationFromCollectionPlan, moveToCollectionPlanFromATOGeneration } from 'actions/mssionmgt';
import { updateIntelStatus } from 'actions/collection';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    atoCollectionPlans: state.mssionmgts.atoCollectionPlans,
    atoGenerations: state.mssionmgts.atoGenerations,
    isLoading: state.mssionmgts.isFetching,
    router: state.router,
  };
};

const mapDispatchToProps = {
  fetchATOCollectionPlans,
  fetchATOGenerations,
  routeATOGeneration,
  moveToATOGenerationFromCollectionPlan,
  moveToCollectionPlanFromATOGeneration,
  updateIntelStatus,
};
export default connect(mapStateToProps, mapDispatchToProps)(AtoComponent);
