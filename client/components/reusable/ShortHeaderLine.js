import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShortHeaderLine extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header-line">
        <img src="/assets/img/admin/upload_1.png" alt=""/>
        <div className="header-text">
          {this.props.headerText}
        </div>
        <img className="mirrored-X-image" src="/assets/img/admin/upload_1.png" alt=""/>
      </div>

    );
  }
}

ShortHeaderLine.propTypes = {
  children: PropTypes.element,

};

export default ShortHeaderLine;
