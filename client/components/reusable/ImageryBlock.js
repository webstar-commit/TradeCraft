import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dropdown from "../reusable/Dropdown";

class FormBlock extends React.Component {

  constructor(props) {
    super(props);
  }
  renderFields() {

    let langs = ['val 1', 'val 2'];

    return this.props.fields.map((item, i) => {

      let input;

      switch(item.type) {
        case 'input':
          input = (<input type="text"/>);
          break;

        case 'dropdown':
          input = (
            <Dropdown key={i} id={i} items={langs}/>
          );
          break;

        case 'date':
          input = (
            <div>
              <input type="text"/>
              <img className="calendar" src="/assets/img/admin/calendar.png" alt=""/>
            </div>
          );
          break;
        case 'checkbox':
          input = (
            <div>
              <input type="checkbox" id={`checkbox${i}`} name={`checkbox${i}`}/>
              <label htmlFor={`checkbox${i}`}><span /></label>
            </div>
          );
          break;

      }

      return (
        <div className="info-line" key={i}>
          <div>
            {item.name}
          </div>
          <div className="info-field pull-right">
            {input}
          </div>
        </div>
      )
    });
  }

  render() {

    return (
      <div className="col-md-4 map-block">
        <div className="map-image">
          <div className="select-bar col-md-12">
            <div className="label-text">
              {this.props.headerText}
            </div>
          </div>
          <img src={this.props.src} className="photo" alt=""/>
          <div className="info-block">
            <div className={`${this.props.bigBackground ? 'big-background' : ''} info-content`}>
              {this.renderFields()}
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

FormBlock.propTypes = {
  children: PropTypes.element,

};

export default FormBlock;
