import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dropdown from "../reusable/Dropdown";
import CustomDatePicker from '../reusable/CustomDatePicker';

class FormBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: []
    }
  }

  componentWillMount() {
    this.setState({
      content: this.props.initstate,
    });
  }

  componentDidUpdate() {
        
    const { content } = this.state;
    const { initstate, editFetched } = this.props;
        
     if (editFetched)
     {
      
       this.props.stopupd();
       this.setState({content:initstate});
      
     }
        
   
  }


  

 

  renderFields() {
    let langs = ['val 1', 'val 2'];

    return this.props.fields.map((item, i) => {

      let input;
      let value = '';
            
      

      if(item.valueField !== undefined && this.state.content[item.valueField] !== undefined && this.state.content[item.valueField] !== null) {
        value = this.state.content[item.valueField];
      }
     
      switch(item.type) {
        case 'input':
        if(item.readonly){
          input = (<input type="text" readOnly={true} name={item.valueField} value={value} />);
        }else
          input = (<input type="text" name={item.valueField} value={value}  />);
          break;

        case 'dropdown':
          input = (
            <Dropdown key={i} id={i} items={langs}/>
          );
          break;

        case 'date':
          input = (
            <div>
              <CustomDatePicker />
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
        <div className="info-line" key={'elem' + i}>
          <div className = "col-md-12 mission-label">
            {item.name}
          </div>
          <div className="col-md-12 mission-detail-view info-field">
            {input}
          </div>
        </div>
      )
    });
  }

  render() {

    return (
      <div className="col-md-4 info-block">
       <div className="info-header">
            <img src={this.props.headerLine} alt="" />
            <div className="header-text">
              {this.props.title}
            </div>
            <img className="mirrored-X-image" src={this.props.headerLine} alt="" />
          </div>
        <div className={`${this.props.bigBackground ? 'big-background' : ''} info-content`}>
          {this.renderFields()}
        </div>
      </div>
    );
  }
}

FormBlock.propTypes = {
  data: PropTypes.func,
  editFetched: PropTypes.bool,
  initstate: PropTypes.any
};

export default FormBlock;
