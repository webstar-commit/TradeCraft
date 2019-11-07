import {connect} from 'react-redux';

import MunitionsSpecificationComponent from '../../components/admin/MunitionsSpecificationComponent';
import { addMunition, fetchMunitions, deleteMunitionsById } from 'actions/munition';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allMunitions: state.munitions.allMunitions,
    munition: state.munitions.oneMunition,
    isLoading: state.munitions.isFetching,
    isDeleted: state.munitions.isDeleted

  };
};

const mapDispatchToProps = {
  addMunition,
  fetchMunitions,
  deleteMunitionsById,
};

export default connect(mapStateToProps, mapDispatchToProps)(MunitionsSpecificationComponent);
