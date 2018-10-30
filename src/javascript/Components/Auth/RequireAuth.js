import React, {Component} from 'react'
import store from '../../Store'
import {connect} from 'react-redux'

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this
          .context
          .router
          .history
          .push('/login', {state: 'state'});
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this
          .context
          .router
          .history
          .push('/login', {state: 'state'});
      }
    }

    render() {
      return <ComposedComponent {...this.props}/>
    }
  }

  function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated};
  }

  return connect(mapStateToProps)(Authentication);
}
