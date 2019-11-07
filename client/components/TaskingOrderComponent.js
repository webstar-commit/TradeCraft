import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class TaskingOrderComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <div className="container">
          <div className="row" >
            <h2>tasking</h2>
          </div>
        </div>
      </div>
    );
  }
}

TaskingOrderComponent.propTypes = {
  children: PropTypes.element,

};

export default TaskingOrderComponent;
