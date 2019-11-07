import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FullHeaderLine from '../reusable/FullHeaderLine';
import HalfHeaderLine from '../reusable/HalfHeaderLine';
import ShortHeaderLine from '../reusable/ShortHeaderLine';
import Dropdown from "../reusable/Dropdown";
import StatusTable from "../reusable/StatusTable";

import ConfigBlock from '../reusable/ConfigBlock';
import DashboardCircleStatus from '../reusable/DashboardCircleStatus';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class SysHealthComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const enterpriseAPIStatus = [
      {name: 'PRISM', type: 'checkbox'},
      {name: 'CRATE', type: 'checkbox'},
      {name: 'Legacy Archive', type: 'checkbox'},
      {name: 'Legacy intel Request', type: 'checkbox'},
      {name: 'Legacy ATO', type: 'checkbox'},
      {name: 'Legacy 8/9 Line', type: 'checkbox'},
      {name: 'Legacy Report', type: 'checkbox'},
      {name: 'Legacy Depot Status', type: 'checkbox'},
    ];

    const networkStatus = [
      {name: 'up[23]', type:'checkbox'},
      {name: 'critical[2]', type:'checkbox'},
      {name: 'warning[1]', type:'checkbox'},
      {name: 'undefined[3]', type:'checkbox'}
    ];

    const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];

    let alert=['any alert', 'alert1'];
    let times=['last 10 min', 'last 20 min'];

    const logHeader=['most common event', 'events', 'trend'];
    const logDetail=[
      {common:'objectaudit', events:'400', trend:'100'},
      {common:'userlogon', events:'275', trend:'65'},
      {common:'userlogoff', events:'158', trend:'100'},
      {common:'policyscopchage', events:'144', trend:'30'},
      {common:'udpbombdenial', events:'135', trend:'15'},
      {common:'webtrafficaudit', events:'89', trend:'15'},
      {common:'processstart', events:'77', trend:'15'},
    ]

    return (
      <div>
        <div className="row sys-health">
          <div className="col-md-12">
            <FullHeaderLine headerText="sys Health" />
          </div>
          <div className="col-md-12">
            <div className="col-md-4 percent-block">
              <HalfHeaderLine headerText="cpu perfomance" />

              <LineChart width={550} height={200} data={data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
              </LineChart>

            </div>
            <div className="col-md-4 percent-block">
              <HalfHeaderLine headerText="Memory" />
              <DashboardCircleStatus statusHeader="capacity" statusPercent="86%" />
            </div>
            <div className="col-md-4 percent-block">
              <HalfHeaderLine headerText="data storage" />
              <DashboardCircleStatus statusHeader="mission" statusPercent="86%"  />
              <DashboardCircleStatus statusHeader="reports" statusPercent="23%"  />
              <DashboardCircleStatus statusHeader="video" statusPercent="57%"  />
              <DashboardCircleStatus statusHeader="tracks" statusPercent="34%"  />
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-3">
              <ConfigBlock subHeaderText="enterprise api status" fields={enterpriseAPIStatus} block="1" />
            </div>
            <div className="col-md-3">
              <ConfigBlock subHeaderText="network status" fields={networkStatus} block="2" />
            </div>
            <div className="col-md-6">
              <HalfHeaderLine headerText="event log" />
              <div className="col-md-12 event-log">
                <div className="select-bar">
                  <div className="col-md-8 alert-type">
                    <Dropdown key={1} id={1} items={alert}/>
                  </div>
                  <div className="col-md-4 time-period">
                    <Dropdown key={2} id={2} items={times}/>
                  </div>
                </div>
                <div classNam="log-table">
                  <StatusTable thead={logHeader} lines={logDetail} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SysHealthComponent.propTypes = {
  children: PropTypes.element,
};

export default SysHealthComponent;
