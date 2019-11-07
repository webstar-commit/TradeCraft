import React from 'react';
import {
  Link
} from 'react-router-dom';

// will use that component after update react to v16
class MenuComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  renderMenuItems() {

    const {translations} = this.props;

    const menuItems = [
      {title: translations['dashboard'], url: '/'},
      {title: translations['liveview'], url: '/'},
      {title: translations['status'], url: '/'},
      {title: translations['intel request'], url: '/'},
      {title: translations['mission mgt'], url: '/'},
      {title: translations['schedules'], url: '/'},
      {title: translations['orders/assets'], url: '/'},
      {title: translations['intel library'], url: '/'},
      {title: translations['messages'], url: '/'},
      {title: translations['admin'], url: '/'},
      {title: translations['logout'], url: '/'}
    ];

    return menuItems.map((item, i) => {
      let image = 'images/button-line.png';
      if (i === 0) {
        image = 'images/button-line-highlight.png';
      }

      return (
        <div className="menu-button" key={i}>
          <Link to={item.url} >
            <button >
              {item.title}
            </button>
          </Link>
          <div className="under-button-line">
            <img src={image} className=" pull-right" alt=""/>
          </div>
        </div>
      );
    });
  }

  render () {

    return (
      <div>
        {this.renderMenuItems()}
      </div>
    );
  }
}

export default MenuComponent;
