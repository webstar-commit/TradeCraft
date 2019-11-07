import {connect} from 'react-redux';

import ReferenceDocsComponent from '../../components/admin/ReferenceDocsComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(ReferenceDocsComponent);
