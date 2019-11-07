import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import HalfHeaderLine from './reusable/HalfHeaderLine';
import ShortHeaderLine from './reusable/ShortHeaderLine';
import CustomDatePicker from './reusable/CustomDatePicker';
import Dropdown from './reusable/Dropdown';
import ButtonsList from './reusable/ButtonsList';
import CustomButton from './reusable/CustomButton';
import ScheduleGroupTable from './reusable/ScheduleGroupTable';

import Timeline from 'react-calendar-timeline/lib';
import moment from 'moment';

class SchedulesComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const filterItems=['val1', 'val2'];
    const {translations} = this.props;

    const groups = [
      {id: 1, title: 'group 1'},
      {id: 2, title: 'group 2'},
      {id: 3, title: 'group 3'},
      {id: 4, title: 'group 4'},
    ];

    const items = [
        {id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour')},
        {id: 2, group: 1, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour')},
        {id: 3, group: 3, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour')},
        {id: 4, group: 4, title: 'item 4', start_time: moment().add(2, 'hour'), end_time: moment().add(4, 'hour')}
    ];

    const sideTableHeader = ['', ''] ;
    const sideTableContent = [
      {name:'bagram, afg', flatform:'peadator', location:'group 1'},
      {name:'bagram, afg', flatform:'peadator', location:'group 2'},
      {name:'bagram, afg', flatform:'rc-135', location:'group 3'},
      {name:'bagram, afg', flatform:'rc-135', location:'group 4'}
    ];


    return (
      <div>
        <div className="schedule">
          <div className="col-md-12">
            <div className="col-md-3 schedule-views">
              <ShortHeaderLine headerText={translations["schedule views"]} />
              <div className="schedule-views">
                <div className="view-element">
                  <div> {translations["DAY"]} </div>
                  <img src="/assets/img/schedules/day_image.png" />
                </div>
                <div className="view-element">
                  <div> {translations["SHIFT"]} </div>
                  <img src="/assets/img/schedules/shift_image.png" />
                </div>
                <div className="view-element">
                  <div> {translations["CALL"]} </div>
                  <img src="/assets/img/schedules/call_image.png" />
                </div>
                <div className="view-element">
                  <div> {translations["MISSION"]} </div>
                  <img src="/assets/img/schedules/mission_image.png" />
                </div>
                <div className="view-element">
                  <div> {translations["ROLE"]} </div>
                  <img src="/assets/img/schedules/role_image.png" />
                </div>
              </div>
            </div>
            <div className="col-md-5 schedule-filters">
              <HalfHeaderLine headerText={translations["Filters"]} />
              <div className="filter-element">
                <CustomDatePicker headerText={translations["Date"]} />
              </div>
              <div className="filter-element">
                <Dropdown items={filterItems} />
              </div>
              <div className="filter-element">
                <Dropdown items={filterItems} />
              </div>
              <div className="filter-element">
                <Dropdown items={filterItems} />
              </div>
            </div>
            <div className="col-md-4 schedule-manage">
              <HalfHeaderLine headerText={translations["Manage"]} />
              <div className="button-group">
                <div className="col-md-4" style={{padding:0}}>
                  <CustomButton buttonName={translations["Shift Assignment"]} />
                </div>
                <div className="col-md-4" style={{padding:0}}>
                  <CustomButton buttonName={translations["Copy Assignment"]} />
                </div>
                <div className="col-md-4" style={{padding:0}}>
                  <CustomButton buttonName={translations["Time Off"]} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 schedule-calander">
            <div className="col-md-2" style={{padding:0}}>
              <ScheduleGroupTable thead={sideTableHeader} lines={sideTableContent} />
            </div>
            <div className="col-md-10" style={{padding:0}}>
              <Timeline
                className="react-calendar-timeline"
                sidebarWidth={0}
                groups={groups}
                lineHeight={51}
                items={items}
                defaultTimeStart={moment().add(-12, 'hour')}
                defaultTimeEnd={moment().add(12, 'hour')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SchedulesComponent.propTypes = {
  children: PropTypes.element,

};

export default SchedulesComponent;
