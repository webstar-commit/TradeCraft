import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CustomButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="action-buttons" >
        <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
        <button className="highlighted-button">
          {this.props.buttonName}
        </button>
        <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
      </div>
    );
  }
}

CustomButton.propTypes = {
  children: PropTypes.element,

};

export default CustomButton;
