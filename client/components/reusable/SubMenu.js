import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, NavLink } from 'react-router-dom';

class SubMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
                let itemurl="/admin/payloads";
        return (
            <ul className="sub-list">
                <li className="submenu ">
                <NavLink to={this.props.link}>{this.props.names[0]}</NavLink>
                </li>
                <li className="submenu ">
                <NavLink to={this.props.link+'spec'}>{this.props.names[1]}</NavLink>
                </li>
            </ul>
        );
    }
}

SubMenu.propTypes = {
    children: PropTypes.element,

};

export default SubMenu;
