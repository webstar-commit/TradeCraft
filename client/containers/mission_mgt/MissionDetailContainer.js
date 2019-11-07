import {connect} from 'react-redux';

import MissionDetailComponent from '../../components/mission_mgt/MissionDetailComponent';
import {fetchMissionDetailById, uploadMissionReport } from 'actions/mssionmgt';


const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneMissionDetail: state.mssionmgts.oneMissionDetail
  };
};

const mapDispatchToProps = {
  fetchMissionDetailById,
  uploadMissionReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(MissionDetailComponent);
