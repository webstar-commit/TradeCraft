import {connect} from 'react-redux';

import SearchComponent from '../components/SearchComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(SearchComponent);
