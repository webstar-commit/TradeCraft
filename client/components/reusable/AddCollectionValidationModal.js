import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchNextHigherUnit } from 'actions/organicorg';
import { IntelConstants } from '../../dictionary/constants';
import FullHeaderLine from 'components/reusable/FullHeaderLine';
import ModalFormBlock from 'components/reusable/ModalFormBlock';

class AddCollectionValidationModal extends React.Component {

  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;
    this.state = {
      content: [],
      intelRequest: {
        IntelRequestID: '',
        SupportedUnit: unitId,
        UnitId: unitId,
      },
    };
  }

  componentDidMount = () =>{
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;
    const { intelRequest } = this.state;

    // // setting next higher unit
    // this.props.fetchNextHigherUnit(unitId);
    this.props.fetchNextHigherUnit(unitId).then(() => {
      this.setState({
        intelRequest: {
          ...intelRequest,
          NextHigherUnitId: this.getHigherUnit(),
        },
      });
    });
  }

getHigherUnit = () => {
  const { higherUnit } = this.props;
  const higherId = higherUnit.length > 0 ? higherUnit[0].unitID : null;
  return higherId;
}

  saveCollectionValidationModal = (event) => {
    event.preventDefault();
    const { intelRequest } = this.state;
    intelRequest.IntelRequestID = this.props.IntelRequestID;
    this.props.save(intelRequest);
  }

  handleIntelRequest4 = (ir) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        // OrganicUnit: ir.OrganicUnit,
        StatusId: ir.StatusId,
        NextHigherUnitId: ir.NextHigherUnitId,
      },
    });
  }

  handleIntelRequest5 = (ir) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        PriorityId: ir.PriorityId,
        SpecialInstructions: ir.SpecialInstructions,
      },
    });
  }

  render() {
    const { translations } = this.props;
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    const { intelRequest } = this.state;

    const isStatusDisabled = intelRequest.Abbreviation === IntelConstants.STATUS.APR.abbreviation || (intelRequest.MissionId !== null && intelRequest.MissionId !== undefined);
    const statusElem = { name: translations.DispositionStaus, type: 'dropdown', domID: 'dispDispositionStatus', ddID: 'StatusCodes/GetIntelReqStatusCodes', disabled: isStatusDisabled, valFieldID: 'StatusId', required: true };

    const intelRequest4 = [
      statusElem,
      // { name: translations.DispositionStaus, type: 'dropdown', domID: 'dispDispositionStatus', ddID: 'StatusCodes/GetIntelReqStatusCodes', disabled: intelRequest.MissionId, valFieldID: 'StatusId', required: true },
      { name: translations.OrganicUnit, type: 'dropdown', domID: 'organicUnt', ddID: 'Units/GetUnits', valFieldID: 'SupportedUnit', disabled: true },
      { name: translations.NextHigherUnit, type: 'dropdown', domID: 'nextHigherUnit', ddID: 'Units/GetUnits', valFieldID: 'NextHigherUnitId' },
    ];

    const intelRequest5 = [
      { name: translations.Priority, type: 'dropdown', domID: 'intelPriority', ddID: 'Priority', valFieldID: 'PriorityId', required: true /* options: priorityOptions */ },
      { name: translations['special instructions/notes'], type: 'textarea', valFieldID: 'SpecialInstructions', domID: 'SpecialInstructions' },
    ];

    return (
      <div>
        <form action="" onSubmit={this.saveCollectionValidationModal} >
          <div className="react-confirm-alert-overlay">
            <div className="modal-content collection-model-width react-confirm-alert">
              <div className="close-button mission-mgt-close-padding hand-cursor">
                <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
              </div>
              <div className="row intel-request ">
                <div className="col-md-12">
                  <FullHeaderLine headerText={translations.collectionValidation} />
                </div>
                <div className="col-md-6">
                  <ModalFormBlock fields={intelRequest4} data={this.handleIntelRequest4} initstate ={this.state.intelRequest} />
                </div>
                <div className="col-md-6">
                  <ModalFormBlock fields={intelRequest5} data={this.handleIntelRequest5} initstate ={this.state.intelRequest} />
                </div>
              </div>
              <div className="row action-buttons">
                <div className="menu-button">
                  <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button className="btn btn-warning" onClick={this.props.onClose}>{translations.close}</button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
                <div className="menu-button">
                  <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button type="submit" className="btn btn-warning">{translations.submit}</button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AddCollectionValidationModal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    higherUnit: state.organicorgs.nextHigherUnit,
  };
};

const mapDispatchToProps = {
  fetchNextHigherUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCollectionValidationModal);
