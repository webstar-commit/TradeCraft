import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Table extends React.Component {

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

  renderTd(line) {
    return Object.values(line).map((item, i) => {
      let color;

      switch(item) {
        case 'active':
          color = '#00fe00';
          break;

        case 'inactive':
          color = '#fdf100';
          break;

        case 'lost/down':
          color = '#ee1d23';
          break;

        default:
          color = '#84888a'
      }

      return (
        <td key={i} style={{color}}>
          {item}
        </td>
      )
    });
  }

  renderLines() {

    let lines = [
      {network: 'dvb-rcs', type: 'sat', freq:'12.322', ch:12, fmvip: '192.32.131.202', klv21ip: '192.32.131.202', port:800, port2:'active'},
      {network: 'dvb-rcs', type: 'sat', freq:'12.322', ch:12, fmvip: '192.32.131.202', klv21ip: '192.32.131.202', port:800, port2:'lost/down'},
      {network: 'dvb-rcs', type: 'sat', freq:'12.322', ch:12, fmvip: '192.32.131.202', klv21ip: '192.32.131.202', port:800, port2:'lost/down'},
      {network: 'dvb-rcs', type: 'sat', freq:'12.322', ch:12, fmvip: '192.32.131.202', klv21ip: '192.32.131.202', port:800, port2:'active'},
      {network: 'dvb-rcs', type: 'sat', freq:'12.322', ch:12, fmvip: '192.32.131.202', klv21ip: '192.32.131.202', port:800, port2:'inactive'},
    ];

    return lines.map((line, i) => {
      return (
        <tr className={`${i % 2 === 0 ? 'striped' : ''} tr`} key={i}>
          {this.renderTd(line)}
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

Table.propTypes = {
  children: PropTypes.element,

};

export default Table;
