import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FullHeaderLine from '../reusable/FullHeaderLine';
import ButtonsBlock from '../reusable/ButtonsBlock';
import ConfigBlock from '../reusable/ConfigBlock';

class SysConfigComponent extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    const {translations} = this.props;
    const userPermissionButtons = [translations['user admin'], translations['load configuration'], translations['role creation'], translations['hierachy admin'],];
    const serverConfigButtons = [translations['server administration'], translations['associations'], translations['web server'], translations['server diagnostics'],];
    const storageConfigButtons = [translations['direct storage admin'], translations['storage status'], translations['repository quotas'], translations['distributed archive admin'],];
    const videoConfigButtons = [translations['video ingestion'], translations['stream distribution'], translations['bandwidth tracking'], translations['remote hub admin'],];

    
    const mapsWMSConfig = [translations['map server admin'], translations['map repository'], translations['layer admin'], translations['add/delete layers'],];
    const languageMGMT = [translations['language admin'], translations['user/unit language'],];

    const chatServerConfig = [translations['chat server admin'], translations['mission and user assign'], translations['chat search'], translations['chat archive/export'],];
    const securityConfig = [translations['data tagging'], translations['notifications admin'],];

    const iconLibraies = [translations['icon and model admin'], translations['icon association'], translations['add/delete 3d models'], translations['add/delete icons'],];
    const logMGMT = [translations['logging admin'], translations['system logs export'],];

    const enterpriseAPIStatus = [
      {name: translations['PRISM'], type: 'checkbox'},
      {name: translations['CRATE'], type: 'checkbox'},
      {name: translations['Legacy Archive'], type: 'checkbox'},
      {name: translations['Legacy intel Request'], type: 'checkbox'},
      {name: translations['Legacy ATO'], type: 'checkbox'},
      {name: translations['Legacy 8/9 Line'], type: 'checkbox'},
      {name: translations['Legacy Report'], type: 'checkbox'},
      {name: translations['Legacy Depot Status'], type: 'checkbox'},
    ];

    return (
      <div>
        <div className="row sys-config">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["configuration"]} />
          </div>
          <div className="col-md-12">
            <div className="col-md-3">
              <ButtonsBlock subHeaderText={translations["user mgm't/permissions"]} buttons={userPermissionButtons} />
            </div>
            <div className="col-md-3">
              <ButtonsBlock subHeaderText={translations["server config"]} buttons={serverConfigButtons} />
            </div>
            <div className="col-md-3">
              <ButtonsBlock subHeaderText={translations["storage config"]} buttons={storageConfigButtons} />
            </div>
            <div className="col-md-3">
              <ButtonsBlock subHeaderText={translations["video config"]} buttons={videoConfigButtons} />
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-3">
              <ConfigBlock subHeaderText={translations["enterprise api status"]} fields={enterpriseAPIStatus} style={{height: 700}} block="1" />
            </div>
            <div className="col-md-3">
              <ButtonsBlock subHeaderText={translations["maps/wms config"]}buttons={mapsWMSConfig} />
              <ButtonsBlock subHeaderText={translations["language mgmt."]} buttons={languageMGMT} />
            </div>
            <div className="col-md-3">
              <ButtonsBlock subHeaderText={translations["chat server config"]}   buttons={chatServerConfig} />
              <ButtonsBlock subHeaderText={translations["security config"]} buttons={securityConfig} />
            </div>
            <div className="col-md-3">
              <ButtonsBlock subHeaderText={translations["icon libraries"]} buttons={iconLibraies} />
              <ButtonsBlock subHeaderText={translations["log mgmt."]} buttons={logMGMT} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SysConfigComponent.propTypes = {
  children: PropTypes.element,

};

export default SysConfigComponent;
