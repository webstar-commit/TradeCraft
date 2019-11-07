import React from 'react';
import PropTypes from 'prop-types';
import ModalFormBlock from '../../reusable/ModalFormBlock';
import CustomButton from '../../reusable/CustomButton';


class CcirRowDetailModal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    const generalFields = [
      {name: 'COCOM', type: 'dropdown'},
      {name: 'Country', type: 'dropdown'},
      {name: 'Region', type: 'dropdown'},
      {name: 'Unit', type: 'dropdown'},
      {name: 'Commander', type: 'dropdown'},
      {name: 'Record Date', type: 'date'},
    ];

    return (
      <div className="ccir-modal modal-overlay" >
        <div className="modal-content">
          <div className="close-button" >
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div>
          <div className="modal-header-text">Add New CCIR/PIRs </div>
          <div className="col-md-12">
            <ModalFormBlock fields={generalFields} />
          </div>
          <div className="col-md-12" style={{textAlign:'center'}}>
            <CustomButton buttonName="save" />
          </div>
        </div>
      </div>
    );
  }
}

CcirRowDetailModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default CcirRowDetailModal;