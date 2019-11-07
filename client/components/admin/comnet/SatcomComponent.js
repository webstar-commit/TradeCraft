import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Table from "../../reusable/Table";

class PersonnelComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMap: '/assets/img/admin/comsnet1.png'
    };
  }


  render() {

    const thead = ['network', 'type', 'freq.', 'ch.', 'fmv ip', 'klv/21 ip', 'port', 'port'];

    return (
      <div>
        <div className="map">
          <img src={this.state.currentMap} alt=""/>
        </div>
        <div className="alert">
          <img src="/assets/img/admin/exclamation_mark.png" alt=""/>
          <div>alert: dvb relay bravo 6 impacting mission "rolling thunder" ... capacity on galileo 9 available... dvb relay bravo</div>
          <img src="/assets/img/admin/exclamation_mark.png" alt=""/>
        </div>
        <div className="table-list">
          <div className="col-md-6">
            <Table thead={thead}/>
          </div>
          <div className="col-md-6">
            <Table thead={thead}/>
          </div>
        </div>
      </div>
    );
  }
}

PersonnelComponent.propTypes = {
  children: PropTypes.element,

};

export default PersonnelComponent;
