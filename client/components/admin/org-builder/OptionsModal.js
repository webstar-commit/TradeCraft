import React from 'react';
import PropTypes from 'prop-types';

class OptionModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="status-modal modal-overlay" >
        <div className="modal-content">
          <div className="close-button" >
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div>
          <div className="row action-buttons add-button">
            <div className="col-md-12">
              <button className="btn btn-success" onClick={() => this.props.onSelect(this.props.nodeId, 'add')} >Add Node</button>
            </div>
            <div className="col-md-12 add-button">
              <button className="btn btn-info" onClick={() => this.props.onSelect(this.props.nodeId, 'edit')} >Edit Node</button>
            </div>
            <div className="col-md-12 add-button">
              <button className="btn btn-danger btn-large" onClick={() => this.props.onSelect(this.props.nodeId, 'remove')} >Remove Node</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OptionModal.propTypes = {
  nodeId: PropTypes.string, 
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default OptionModal;
