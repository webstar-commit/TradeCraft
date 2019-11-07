import { connect } from 'react-redux';

import PlatformsSpecificationComponent from '../../components/admin/PlatformsSpecificationComponent';
import { addPlatform, fetchPlatforms, deletePlatformById } from 'actions/platform';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allPlatforms: state.platforms.allPlatforms,
    //platform: state.platforms.onePlatform,
    isLoading: state.platforms.isFetching,
    isDeleted: state.platforms.isDeleted
  };
};

const mapDispatchToProps = {
  // addPlatform,
  fetchPlatforms,
   deletePlatformById,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsSpecificationComponent);
