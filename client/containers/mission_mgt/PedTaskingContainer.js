import { connect } from 'react-redux';

import PedTaskingComponent from '../../components/mission_mgt/PedTaskingComponent';
import { fetchPedTasks, fetchPedTasksATO, 
  moveToPedTaskFromATOGeneration, moveToATOGenerationFromPedTask, moveToFlightOPSFromATO, moveToATOFromFlightOPS } from 'actions/mssionmgt';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    pedTasksAtoGenerations: state.mssionmgts.pedTasksAtoGenerations,
    pedTasks: state.mssionmgts.pedTasks,
  };
};

const mapDispatchToProps = {
  fetchPedTasks,
  fetchPedTasksATO,
  moveToPedTaskFromATOGeneration,
  moveToATOGenerationFromPedTask,
  moveToFlightOPSFromATO,
  moveToATOFromFlightOPS,
};

export default connect(mapStateToProps, mapDispatchToProps)(PedTaskingComponent);