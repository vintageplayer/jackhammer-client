import React, {Component} from 'react'
import Breadcrumb from './Breadcrumb'
import SeverityPercentage from './SeverityPercentage'
import ScanStatuses from './ScanStatuses'
import TopVulnerableRepos from './TopVulnerableRepos'
import TopVulnerableTypes from './TopVulnerableTypes'
import * as analyticsActions from '../../Actions/AnalyticsActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import '../../../stylesheets/analytics.css'

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOwnerType: null
    };
  }
  componentDidMount() {
    var {ownerType} = this.props.match.params;
    this.setState({currentOwnerType: ownerType})
    this.fetchData(ownerType)
  }
  fetchData(ownerTypeId) {
    var payload = {
      ownerTypeId: parseInt(ownerTypeId)
    }
    this
      .props
      .actions
      .fetch(payload)
  }
  componentWillReceiveProps(nextProps) {
    var previousOwnerType = this.props.match.params.ownerType;
    var currentOwnerType = nextProps.match.params.ownerType;
    if (previousOwnerType != currentOwnerType) {
      this.setState({currentOwnerType: currentOwnerType})
      this.fetchData(currentOwnerType)
    }
  }
  render() {
    return (
      <div class="page-wrapper">
        <Breadcrumb/>
        <section class="content">
          <SeverityPercentage currentOwnerType={this.state.currentOwnerType}/>
          <ScanStatuses/>
          <TopVulnerableRepos currentOwnerType={this.state.currentOwnerType}/>
          <TopVulnerableTypes currentOwnerType={this.state.currentOwnerType}/>
        </section>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(analyticsActions, dispatch)
});
export default connect(null, mapDispatchToProps)(Analytics);
