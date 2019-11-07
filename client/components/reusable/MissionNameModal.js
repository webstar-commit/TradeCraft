import PropTypes from 'prop-types';
import React from 'react';

class MissionNameModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  createMission = () =>{
    const { content } = this.state;
    this.props.moveLeft(this.props.row, content.MissionName);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.updateContent(name, value);
  }

  updateContent(name, value) {
    const { content } = this.state;
    this.setState({
      content: {
        ...content,
        [name]: value,
      },
    }, () => {
    });
  }

  render() {
    const { translations } = this.props;
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className=" react-confirm-alert-overlay" >
        <div className="modal-content">
          <div className="close-button mission-mgt-close-padding hand-cursor">
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div>
          <div className="col-md-12 text-left mission-mgt-txt-padding">
            <label>Mission Name</label>
            <input type="text" className="form-control" name="MissionName" onChange={this.handleChange} />
          </div>
          <div className="col-md-12 text-center mission-mgt-save-btn-padding" >
            <button type="submit" className="highlighted-button" onClick={this.createMission}>
              {translations.submit}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

MissionNameModal.propTypes = {
  children: PropTypes.node,
  moveLeft: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  row: PropTypes.object,
  show: PropTypes.bool,
};

export default MissionNameModal;
