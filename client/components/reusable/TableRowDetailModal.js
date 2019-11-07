import React from 'react';
import PropTypes from 'prop-types';
import ModalFormBlock from './ModalFormBlock';
import CustomButton from './CustomButton';


class TableRowDetailModal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="rowdata-modal modal-overlay" >
        <div className="modal-content">
          <div className="close-button" >
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div>
          <div className="col-md-12">
            <ModalFormBlock fields={this.props.rowdata} data={this.props.rowvalues} initstate ={this.props.init}/>
          </div>
          <div className="col-md-12" style={{textAlign:'center'}}>
            <CustomButton buttonName="save" />
          </div>
        </div>
      </div>
    );
  }
}

TableRowDetailModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default TableRowDetailModal;