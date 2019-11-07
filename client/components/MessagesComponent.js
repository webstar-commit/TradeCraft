import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import CustomDatePicker from './reusable/CustomDatePicker';
import ConfigBlock from './reusable/ConfigBlock';
import FullHeaderLine from './reusable/FullHeaderLine';
import Dropdown from './reusable/Dropdown';
import FormBlock from "./reusable/FormBlock";
import StatusTable from "./reusable/StatusTable";
import HalfHeaderLine from './reusable/HalfHeaderLine';
import DashboardCircleStatus from './reusable/DashboardCircleStatus';
import NumBlock from './reusable/NumBlock';
import OperationVideoBlock from './reusable/OperationVideoBlock';

import MailList from './reusable/MailList';




class MessagesComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let langs = ['val 1', 'val 2'];
    const {translations} = this.props;

    const actionRequired = [
      {name: 'Intel request #8232-2 awating review', type: 'checkbox'},
      {name: 'Req. Overlap on #9232-2 / #8823-2', type: 'checkbox'},
      {name: 'Update/Add PRISM Imagery #3233-2', type: 'checkbox'},
      {name: 'Contingency Required #5922-1', type: 'checkbox'},
    ];

    const notification = [
      {name: 'Mission Request #2322-3 AOT Issued', type: 'checkbox'},
      {name: 'Mission Flag Day 9 Line-HVT in AO', type: 'checkbox'},
      {name: 'Mission LightWave Flight Plan Posted', type: 'checkbox'},
      {name: 'Mission Green Eye Fully Resourced', type: 'checkbox'}
    ];

    const priorityAlerts = [
      {name: 'Rolling Thunder Start in 1h 06m', type: 'checkbox'},
      {name: 'Mission FlagDay Cancel', type: 'checkbox'},
      {name: 'Mission LightHit Delay - Maintenance', type: 'checkbox'},
      {name: 'DVB-RCS Channels 10-18 Down', type: 'checkbox'}
    ];

    const mailList = [
      {avatar:'murry', name: 'Muhammed Hammadah', day:'July 29.2017', message:'Looking like low-ceiling cloud cover will prevnet us from hitting our mark on POI34. Like to request a routing to POI53 then hope to circle back on POI34 on return to...'},
      {avatar:'murry', name: 'Muhammed Hammadah', day:'July 29.2017', message:'Looking like low-ceiling cloud cover will prevnet us from hitting our mark on POI34. Like to request a routing to POI53 then hope to circle back on POI34 on return to...'},
      {avatar:'murry', name: 'Muhammed Hammadah', day:'July 29.2017', message:'Looking like low-ceiling cloud cover will prevnet us from hitting our mark on POI34. Like to request a routing to POI53 then hope to circle back on POI34 on return to...'},
      {avatar:'murry', name: 'Muhammed Hammadah', day:'July 29.2017', message:'Looking like low-ceiling cloud cover will prevnet us from hitting our mark on POI34. Like to request a routing to POI53 then hope to circle back on POI34 on return to...'}
    ];

    return (
      <div>
        <div className="row messages">
          <div className="col-md-12" style={{padding:0}}>
            <div className="col-md-4">
              <ConfigBlock subHeaderText={translations["action required"]} fields={actionRequired} block="1" />
            </div>
            <div className="col-md-4">
              <ConfigBlock subHeaderText={translations["Notification"]} fields={notification} block="2"/>
            </div>
            <div className="col-md-4">
              <ConfigBlock subHeaderText={translations["priorityalerts"]} fields={priorityAlerts} block="3"/>
            </div>
          </div>
        </div>
        <div className="row messages">
          <div className="col-md-12">
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["email"]} />
              <div className="email-content">
                <div className="sidebar">
                  <div className="sidebutton">
                    <img src="/assets/img/message/message_icon.png" alt=""/>
                    {translations["New Messages"]}
                  </div>
                  <div className="sidebutton">
                    <img src="/assets/img/message/inbox_icon.png" className="brightness" alt=""/>
                    {translations["Inbox"]}
                  </div>
                  <div className="sidebutton">
                    <img src="/assets/img/message/sent_icon.png" alt=""/>
                    {translations["Sent Mail"]}
                  </div>
                  <div className="sidebutton">
                    <img src="/assets/img/message/pen_icon.png" alt=""/>
                    {translations["Drafts"]}
                  </div>
                  <div className="sidebutton">
                    <img src="/assets/img/message/trash_icon.png" alt=""/>
                    {translations["Trash"]}
                  </div>
                  <div className="col-md-12">
                    {translations["Folders"]}
                    <div className="folder-tree">
                      <img src="/assets/img/message/folder_image.png" /> {translations["Rolling Thunder"]}
                    </div>
                    <div className="folder-tree">
                      <img src="/assets/img/message/folder_image.png" /> {translations["Platform"]}
                    </div>
                    <div className="folder-tree">
                      <img src="/assets/img/message/folder_image.png" /> {translations["Org builder"]}
                    </div>
                  </div>
                </div>
                <div className="email-body">
                  <div className="header-bar">
                    <div className="col-md-2">
                      {translations["select"]}
                    </div>
                    <div className="col-md-10">
                      {translations["Message Details"]}
                    </div>
                  </div>
                  <MailList mails={mailList} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="chat-header-line">
                <img src="/assets/img/message/headerline2.png" alt=""/>
                <div className="header-text">
                 {translations["A-ISR Mission Manager Chat"]}
                </div>
                <img className="mirrored-X-image" src="/assets/img/message/headerline2.png" alt=""/>
              </div>
              <div className="chat-content">
                <div className="sidebar">
                  <div className="col-md-12">
                    <div className="sidebar-header">
                      {translations["Participants List"]}
                    </div>
                  </div>
                  <div className="col-md-12 name-list">
                    <div className = "each-name">
                      <img src="/assets/img/message/white_circle.png" />
                      Albert Barker
                    </div>
                    <div className = "each-name">
                      <img src="/assets/img/message/sky_circle.png" />
                      Albert Barker
                    </div>
                    <div className = "each-name">
                      <img src="/assets/img/message/yellow_circle.png" />
                      Albert Barker
                    </div>
                    <div className = "each-name">
                      <img src="/assets/img/message/red_circle.png" />
                      Albert Barker
                    </div>
                    <div className = "each-name">
                      <img src="/assets/img/message/blue_circle.png" />
                      Albert Barker
                    </div>
                  </div>
                </div>
                <div className="chat-body">
                  <div className="col-md-12 chatbody-header">
                    {translations["Rolling Thunder"]}
                  </div>
                  <div className="col-md-12 chat-list">
                    <div className="each-chat">
                      <div className="chat-to">
                        <img src="/assets/img/message/white_circle.png" />
                        Albert Barker
                      </div>
                      <div className="chat-detail">
                        Looking like low-celing cloud cover will prevnet us from hitting our mark on POI 34
                      </div>
                      <div className="chat-time">
                        [31.10.2017]
                      </div>
                    </div>
                    <div className="each-chat">
                      <div className="chat-to">
                        <img src="/assets/img/message/white_circle.png" />
                        Albert Barker
                      </div>
                      <div className="chat-detail">
                        Looking like low-celing cloud cover will prevnet us from hitting our mark on POI 34
                      </div>
                      <div className="chat-time">
                        [31.10.2017]
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="chat-input" >
                      <input type="type" placeholder={translations["Enter your text here"]} />
                      <img src="/assets/img/message/chat_expand_icon.png" />
                    </div>
                    <div className="chat-sent">
                      <img src="/assets/img/message/chat_send_icon.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MessagesComponent.propTypes = {
  children: PropTypes.element,
};

export default MessagesComponent;
