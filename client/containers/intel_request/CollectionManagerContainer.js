import { fetchCollectionPlans, fetchApprovedIntelRequests, moveToCollectionPlan, moveToIntelRequest,
  updateIntelStatus, routeCollectionIntelRequest  } from 'actions/collection';
// import { fetchIntelRequestById, updateIntelRequest } from 'actions/intel';
import { connect } from 'react-redux';
import CollectionManagerComponent from '../../components/intel_request/CollectionManagerComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allApprovedIntelRequests: state.collections.allApprovedIntelRequests,
    allCollectionsPlan: state.collections.allCollectionsPlan,
    isLoading: state.collections.isFetching,
    isDeleted: state.collections.isDeleted
  };
};

const mapDispatchToProps = {
  fetchCollectionPlans,
  fetchApprovedIntelRequests,
  updateIntelStatus,
  moveToCollectionPlan,
  moveToIntelRequest,
  // fetchIntelRequestById,
  // updateIntelRequest,
  routeCollectionIntelRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionManagerComponent);