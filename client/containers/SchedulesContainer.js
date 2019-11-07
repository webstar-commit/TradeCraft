import {connect} from 'react-redux';

import SchedulesComponent from '../components/SchedulesComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(SchedulesComponent);
