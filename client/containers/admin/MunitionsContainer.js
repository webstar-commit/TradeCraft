import {connect} from 'react-redux';

import MunitionsComponent from '../../components/admin/MunitionsComponent';
import { fetchMunitionInventory, deleteMunitionInventoryById } from 'actions/munitionsinventory';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,    
    allMunitionInventory: state.munitionsinventory.allMunitionInventory,
    isLoading: state.munitionsinventory.isFetching,
    isDeleted: state.munitionsinventory.isDeleted
  };
};

const mapDispatchToProps = {
  fetchMunitionInventory,
  deleteMunitionInventoryById
};

export default connect(mapStateToProps, mapDispatchToProps)(MunitionsComponent);
