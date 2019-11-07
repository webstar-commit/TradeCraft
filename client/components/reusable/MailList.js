import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dropdown from "../reusable/Dropdown";
import CustomDatePicker from '../reusable/CustomDatePicker';
import ShortHeaderLine from './ShortHeaderLine';

class ConfigBlock extends React.Component {

  constructor(props) {
    super(props);
  }

  renderMails() {
    
    return this.props.mails.map((item, i) => {
      return (
        <div className="col-md-12 each-mail">
          <div className=" col-md-2 mail-select" key={i}>
            <input type="checkbox" id={`checkbox${i}`} name={`checkbox${i}`}/>
            <label htmlFor={`checkbox${i}`}><span /></label>
          </div>
          <div className="col-md-2 mail-avatar">
            <img src={'/assets/img/avata/'+item.avatar+'.png'} />
          </div>
          <div className="col-md-8 mail-detail">
            <div className="mail-from">
              <div className="from-name">
                {item.name}
              </div>
              <div className="from-day">
                {item.day}
              </div>                          
            </div>
            <div className="mail-sentence">
              {item.message}
            </div>
          </div>
        </div>
      )
    });
  }

  render() {

    return (
      <div>
        {this.renderMails()}
      </div>
    );
  }
}

ConfigBlock.propTypes = {
  children: PropTypes.element,

};

export default ConfigBlock;
