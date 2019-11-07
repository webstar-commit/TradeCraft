import React from 'react';
import PropTypes from 'prop-types';

class AddNodeModal extends React.Component {

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
          {this.props.fields}
        </div>
      </div>
    );
  }
}

AddNodeModal.propTypes = {
  fields: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddNodeModal;