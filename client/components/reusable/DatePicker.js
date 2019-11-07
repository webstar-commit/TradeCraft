import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class FormBlock extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <div>
        <input type="text" defaultValue={this.props.headerText} />
        <img className="calendar" src="/assets/img/admin/calendar.png" alt=""/>
      </div>
      
    );
  }
}

FormBlock.propTypes = {
  children: PropTypes.element,

};

export default FormBlock;
