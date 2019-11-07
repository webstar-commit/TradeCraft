import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class HalfHeaderLine extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header-line">
        <img src="/assets/img/status/theader_line.png" alt=""/>
        <div className="header-text">
          {this.props.headerText}
        </div>
        <img className="mirrored-X-image" src="/assets/img/status/theader_line.png" alt=""/>
      </div>
    );
  }
}

HalfHeaderLine.propTypes = {
  children: PropTypes.element,

};

export default HalfHeaderLine;
