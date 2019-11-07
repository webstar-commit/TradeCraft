import {connect} from 'react-redux';

import CcirPirComponent from '../../components/admin/CcirPirComponent';
import {fetchCcirPirs, deleteCcirPirById} from 'actions/ccirpir';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allCcirPirs: state.ccirpir.allCcirPirs,
    isDeleted: state.ccirpir.isDeleted
  };
};


const mapDispatchToProps = {
  fetchCcirPirs, 
  deleteCcirPirById
};


export default connect(mapStateToProps, mapDispatchToProps)(CcirPirComponent);
