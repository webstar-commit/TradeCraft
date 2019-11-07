import PropTypes from 'prop-types';
import React from 'react';

class EmailSendModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  sendEmail = (event) => {
    event.preventDefault();
    const { content } = this.state;
    content.Recipiants = this.convertToArray(content.Recipiants);
    this.props.sendEmail(this.props.row, content);
  }

  handleChange = (e) => {
    const { name, value, type } = e.target;
    this.updateContent(name, value);
  }

  convertToArray(emails) {
    //const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    emails = emails.replace(/\s/g, '').split(/,|;/);
    return emails;
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
      <div>
        <form action="" onSubmit={this.sendEmail} >
          <div className="react-confirm-alert-overlay">
            <div className="modal-content">
              <div className="close-button mission-mgt-close-padding hand-cursor">
                <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
              </div>
              <div className="col-md-12 text-left mission-mgt-txt-padding">
                <label>Subject</label>
                <input type="text" className="form-control" name="Subject" onChange={this.handleChange} required />
              </div>
              <div className="col-md-12 text-left mission-mgt-txt-padding">
                <label>To</label>
                <input type="email" className="form-control" name="Recipiants" multiple pattern="^([\w+-.%]+@[A-Za-z0-9_\-\.]+\.[A-Za-z]{2,4},*[\W]*)+$" required onChange={this.handleChange} />
              </div>
              <div className="col-md-12 text-left mission-mgt-txt-padding">
                <label>Message</label>
                <textarea className="form-control teaxtarea-width-height" name="Message" onChange={this.handleChange} />
              </div>
              <div className="col-md-12 text-center mission-mgt-save-btn-padding" >
                <button type="submit" className="highlighted-button" >
                  {translations.submit}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

EmailSendModal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  row: PropTypes.object,
  sendEmail: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default EmailSendModal;