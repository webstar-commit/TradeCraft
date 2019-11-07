
import { connect } from 'react-redux';

import PersonnelComponent from '../../components/admin/PersonnelComponent';
import { fetchPersonnels, deletePersonnelById } from 'actions/personnel';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allPersonnels: state.personnels.allPersonnels,
    isLoading: state.personnels.isFetching,
    isDeleted: state.personnels.isDeleted
  };
};

const mapDispatchToProps = {
  fetchPersonnels,
  deletePersonnelById
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelComponent);
