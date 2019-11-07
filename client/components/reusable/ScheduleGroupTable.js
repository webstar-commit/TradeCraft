import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ScheduleGroupTable extends React.Component {

  constructor(props) {
    super(props);
  }

  renderThead() {

    return this.props.thead.map((item, i) => {
      return (
        <td key={i}>
          <div>
            {item}
          </div>
        </td>
      )
    });
  }

  renderTd(line, i) { 
    let temp ='';
    return Object.values(line).map((item, j) => {
      
      if(j == 0){
        return (
          <td key={j} className="other-item">
            <img src="/assets/img/avata/murry.png" />
          </td>
        )        
      }

      if(j == 1){
        temp = item;
      }

      else{
        return(
          <td key="1">
            <div>{temp}</div>
            <div className="second-text">{item}</div>
          </td>
        )
      }

    });
  }

  renderLines() {

    return this.props.lines.map((line, i) => {
      return (
        <tr className={`${i % 2 === 0 ? 'striped' : 'no-striped'} tr`} key={i}>
        {this.renderTd(line, i)}
        </tr>)
    });
  }

  render() {
    return (
      <table className="table">
        <thead className="thead">
        <tr className="tr">
          {this.renderThead()}
        </tr>
        </thead>
        <tbody className="tbody">
          {this.renderLines()}
        </tbody>
      </table>

    );
  }
}

ScheduleGroupTable.propTypes = {
  children: PropTypes.element,

};

export default ScheduleGroupTable;
