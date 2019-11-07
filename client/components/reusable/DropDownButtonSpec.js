import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Modal from  './Modal';


class DropDownButtonSpec extends React.Component {

  constructor(props) {
    super(props);

  }

  changeValue = (key, value) => {
    
    document.getElementById(`dropdown${key}`).value = value;
  };



  //render dropdown list of lang switcher
  renderItems(key) {

    return this.props.items.map((item, i) => (
        <li key={i}>
          <div className="dropdown-item hand-cursor" href="#" onClick={item.onClick}>{item.name}
          </div>
        </li>
      )
    );
  }

  render() {
    let key = this.props.id || 0;
    return (
      <span className="specification-dropdown">
        <input className="dropdown-toggle hand-cursor" id={`dropdown${key}`} readOnly defaultValue={this.props.label} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          {this.renderItems(key)}
        </ul>
      
        <i className="fa fa-angle-down arrow-font"/>&nbsp;
        {/* <img className="arrow" src="/assets/img/admin/small-arrow.png" alt=""/> */}
      </span>
    );
  }
}

DropDownButtonSpec.propTypes = {
  children: PropTypes.element,


};

export default DropDownButtonSpec;
