import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class FullHeaderLine extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header-line">
        <img src="/assets/img/admin/personnel_1.png" alt=""/>
        <div className="header-text">
          {this.props.headerText}
        </div>
        <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
      </div>

    );
  }
}

FullHeaderLine.propTypes = {
  children: PropTypes.element,

};

export default FullHeaderLine;
