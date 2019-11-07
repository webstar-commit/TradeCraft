import {connect} from 'react-redux';

import LocationComponent from '../../components/admin/LocationComponent';
import { addLocation, fetchLocations, deleteLocationById } from 'actions/location';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allLocations: state.locations.allLocations,
    fetchingLocations: state.locations.isFetching,
    isLoading: state.locations.isFetching,
    isDeleted: state.locations.isDeleted
  };
};

const mapDispatchToProps = {
  addLocation,
  fetchLocations,
  deleteLocationById
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationComponent);
