import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Modal from  './Modal';


class DropDownButton extends React.Component {

  constructor(props) {
    super(props);

  }

  changeValue = (key, value) => {
    console.log(key);
    document.getElementById(`dropdown${key}`).value = value;
  };



  //render dropdown list of lang switcher
  renderItems(key) {

    return this.props.items.map((item, i) => (
        <li key={i}>
          <div className="dropdown-item" href="#" onClick={item.onClick}>{item.name}
          </div>
        </li>
      )
    );
  }

  render() {
    let key = this.props.id || 0;
    return (
      <div>
        <input className="dropdown-toggle" id={`dropdown${key}`} readOnly defaultValue={this.props.label} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          {this.renderItems(key)}
        </ul>
        <img className="arrow" src="/assets/img/admin/small-arrow.png" alt=""/>
      </div>
    );
  }
}

DropDownButton.propTypes = {
  children: PropTypes.element,


};

export default DropDownButton;
