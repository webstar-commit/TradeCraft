import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class StatusTable extends React.Component {

  constructor(props) {
    super(props);
  }

  renderThead() {

    return this.props.thead.map((item, i) => {
      return (
        <td key={i}>
          <div className="th-image">
            {item}
          </div>
        </td>
      )
    });
  }

  renderTd(line, i) { 
    return Object.values(line).map((item, j) => {
      let color;

     

      if(item =='view'){
        return (
          <td key={j} style={{color}} className="other-item">
            <img src="/assets/img/general/eye_icon.png" />
          </td>
        )        
      }

      else{
        return (
          <td key={j} style={{color}}>
            {item}
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

StatusTable.propTypes = {
  children: PropTypes.element,

};

export default StatusTable;
