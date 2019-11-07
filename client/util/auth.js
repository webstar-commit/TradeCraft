import { refresh } from '../actions/auth';


export const confirmRole = (role) => ((nextState, replace) => {
    if (store.getState().user.role !== role) {
      replace({ pathname: '/', state: { nextPathname: nextState.location.pathname } });
    }
  });

  export const refreshToken = () => {
    let ses = JSON.parse(localStorage.getItem('session'));
    let refresh_token = ses.refresh_token;
    console.log(refresh_token);
    let obj = {'grant_type':'refresh_token', 'refresh_token':refresh_token}
    this.refresh(obj).then(() => {
      console.log("this.props");
    });
  }

  const mapDispatchToProps = {
      refresh,
  };