import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link,  NavLink} from 'react-router-dom';
import FullHeaderLine from './reusable/FullHeaderLine';
import ContentBlock from './reusable/ContentBlock';
import ContentFull from './reusable/ContentFull';
import { changePassword } from 'actions/auth';
import { showAlert } from '../util/helpers';

class ChangePasswordComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        register: {}
    }
  }

  onClear(){
    console.log("Cleared");
  }

  onEnter(){
    console.log("enter");
  }

  handleGeneralPersonnelData = (generalData) => {
    const { register } = this.state;

    this.setState({
      register: {
        ...register,
        OldPassword: generalData.OldPassword,
        Password: generalData.Password,
        ConfirmPassword: generalData.ConfirmPassword,
      },
      // selectedBranch: generalData.ServiceBranch,
      // selectedRank: generalData.Rank,
      // selectedPaygrade: paygrade,
    });

  }

  handleSubmit = event => {

    event.preventDefault();
    let {  register } = this.state;
      
      this.props.changePassword(register).then(() => {
        // Stop Loader
        // this.setState({loading:false});
        // this.props.onClose(NoticeType.ADD);
        showAlert("Password Changed");
      });

  }


  render() {
    
    const generalFields = [
        {name: 'Old Password', type: 'password', domID: 'OldPassword', valFieldID: 'OldPassword', required: true },
        {name: 'New Password', type: 'password', domID: 'Password', valFieldID: 'Password', required: true },
        {name: 'Confirm Password', type: 'password', domID: 'ConfirmPassword', valFieldID: 'ConfirmPassword', required: true},
      ];

    return (
      <div className="login">
        <div className="col-md-12">
          <FullHeaderLine headerText="unclassified"/>
        </div>
        <div className="col-md-12 logo">
          <img src="/assets/img/login/logo.png" />
        </div>
        <div className="col-md-12">
          <div className="second-header-line">
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              Change Password
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
        </div>
        <div className="col-md-12 login-part"> 
            
            <div className="login-info">
              {/* <div className="col-md-12 login-text">
                Change Password
              </div>
              <div className="col-md-12 login-input">
                <input defaultValue="User Name" />
              </div>
              <div className="col-md-12 login-input">
                <input defaultValue="Password" />
              </div>
              <div className="col-md-12 login-button">
                 <div className="row action-buttons" >
                  <div className="menu-button">
                    <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                    <button className="highlighted-button" onClick={this.onClear.bind(this)}>
                      CLEAR
                    </button>
                    <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                  </div>
                  <div className="menu-button">
                    <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                    < NavLink to="dashboard">
                      <button className="highlighted-button" onClick={this.onEnter.bind(this)}>
                        ENTER
                      </button>
                    </NavLink>
                    <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                  </div>
                </div>
              </div> */}

            <div className="col-md-4"></div>
              <ContentBlock 
              fields={generalFields} data={this.handleGeneralPersonnelData} initstate ={this.state.register} editId = {0} />
              
              <div className="col-md-4"></div>
            </div>
          
        </div>
        <div className="row action-buttons">
        <div className="menu-button">
          <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
          <button className='highlighted-button' >
            Clear
          </button>
          <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
        </div>
        <div className="menu-button">
          <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
          <button type="submit" className='highlighted-button' onClick={this.handleSubmit}>
            Submit        </button>
          <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
        </div>
      </div>
        <div className="col-md-12 app-name">
          centcom a-isr mission manager
        </div>
        <div className="col-md-12 logo-text">
          <div className="text-header">
            Use of this or any other DoD interest computer system constitutes comsent to monitoring at all times.
          </div>
          <div className="text-body">
            This is a DoD interest computer system. All DoD interest computer systems and related equipment are intended for the communication, transmission, processing, and storage of official U.S. Government or other authorized information only. All DoD interest 
computer systems are subject to monitoring at all times to ensure proper functioning of equipment and systems including security devices and systems, to prevent unauthorized use and violations of statutes and security regulations, to deter criminal activity, and for other similar purposes. Any user of a DoD interest computer system should be aware that any information placed in the system is subject to monitoring and is not subject to any expectation of privacy. If monitoring of this or any other DoD interest 
computer system reveals possible evidence of violation of criminal statutes, this evidence and any other related information, including identification information about the user, may be provided to law enforcement officials. If monitoring of this or any other 
DoD interest computer systems reveals violations of security regulations or unauthorized use, employees who violate security regulations or make unauthorized use of DoD interest computer systems are subject to appropriate disciplinary action.
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

ChangePasswordComponent.propTypes = {
  children: PropTypes.element,

};

const mapStateToProps = state => {
    return {
      translations: state.localization.staticText,
    };
  };

const mapDispatchToProps = {
    changePassword,
};

export default connect(mapStateToProps,mapDispatchToProps)(ChangePasswordComponent)
