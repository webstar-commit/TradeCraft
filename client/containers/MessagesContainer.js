import {connect} from 'react-redux';

import MessagesComponent from '../components/MessagesComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(MessagesComponent);
