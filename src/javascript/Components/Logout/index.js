import React, {Component} from 'react'
import * as AuthActions from '../../Actions/AuthActions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'

class Logout extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this
      .props
      .actions
      .userSignout();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.logout) {
      this
        .context
        .router
        .history
        .push("/login", {state: 'state'});
    }
  }
  render() {
    return (
      <div></div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}
const mapStateToProps = (state) => ({auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(Logout)
