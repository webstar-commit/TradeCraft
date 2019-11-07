import {connect} from 'react-redux';

import MissionMGTComponent from '../components/MissionMGTComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(MissionMGTComponent);
