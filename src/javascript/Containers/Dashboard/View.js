import React, {Component} from 'react'
import SeverityCountChart from './SeverityCountChart'
import TrendChart from './TrendChart'
import VulnerabilityTypePieChart from './VulnerabilityTypePieChart'
import TopVulnerableReposChart from './TopVulnerableReposChart'
import PercentageTrendChart from './PercentageTrendChart'
import * as dasboardActions from '../../Actions/DashboardActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import '../../../stylesheets/dashboard.css'

class View extends Component {
  componentDidMount() {
    var {ownerType, scanType,} = this.props;
    if (this.props.auth.authenticated) {
      this.fetchData(ownerType, scanType)
    }
  }
  fetchData(ownerTypeId, scanTypeId) {
    var payload = {
      ownerTypeId: parseInt(ownerTypeId),
      scanTypeId: parseInt(scanTypeId),
      isExecutiveDashboard: false
    }
    this
      .props
      .actions
      .fetch(payload);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.ownerType != nextProps.ownerType || this.props.scanType != nextProps.scanType) {
      this.fetchData(nextProps.ownerType, nextProps.scanType)
    }
  }
  render() {
    const {ownerType, scanType} = this.props;
    return (
      <section class="content">
        <SeverityCountChart currentScanType={scanType} currentOwnerType={ownerType} executiveDashboard={false}/>
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <TrendChart/>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <VulnerabilityTypePieChart/>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="stack-chart col-md-6">
            <div class="card">
              <div class="card-body">
                <TopVulnerableReposChart/>
              </div>
            </div>
          </div>
          <div class="col-md-6 line-percentage-chart">
            <div class="card">
              <div class="card-body">
                <PercentageTrendChart/>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dasboardActions, dispatch)
});
const mapStateToProps = (state) => ({auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(View);
