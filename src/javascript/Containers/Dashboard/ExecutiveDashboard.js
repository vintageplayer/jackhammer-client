import React, {Component} from 'react'
import SeverityCount from './SeverityCountChart'
import ApplicationsTrendChart from './ApplicationsTrendChart'
import ExecutiveSeverityCountChart from './ExecutiveSeverityCountChart'
import BugsClosingTrendChart from './BugsClosingTrendChart'
import StackBarChart from './StackBarChart'
import StackColumnChart from './StackColumnChart'
import DonutChart from './DonutChart'
import PercentagePieChart from './PercentagePieChart'
import * as dasboardActions from '../../Actions/DashboardActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class ExecutiveDashboard extends Component {
  componentDidMount() {
    var {ownerType, scanType} = this.props.match.params;
    if (this.props.auth.authenticated) {
      this.fetchData(ownerType, scanType)
    }
  }
  fetchData(ownerTypeId, scanTypeId) {
    var payload = {
      ownerTypeId: parseInt(ownerTypeId),
      scanTypeId: parseInt(scanTypeId),
      isExecutiveDashboard: true
    }
    this
      .props
      .actions
      .fetch(payload);
  }
  render() {
    const {ownerType, scanType,} = this.props.match.params;
    return (
      <div class="page-wrapper">
        <section class="content-header">
          <h4>
            Executive Dashboard
          </h4>
          <ul class="breadcrumb">
            <li>
              <a href="/">
                <i class="fa fa-home"></i>Home</a>
            </li>
            <li class='active'>
              <a href="#">
                Executive Dashboard
              </a>
            </li>
          </ul>
        </section>
        <section class="content">
          <div class='col-xs-6'>
            <div class="card">
              <div class="card-body">
                <DonutChart/>
              </div>
            </div>
          </div>
          <div class='col-xs-6'>
            <div class="card">
              <div class="card-body">
                <PercentagePieChart/>
              </div>
            </div>
          </div>
          <div class='col-xs-12'>
            <div class="card">
              <div class="card-body">
                <StackBarChart currentOwnerType={ownerType}/>
              </div>
            </div>
          </div>
          <div class='col-xs-12'>
            <div class="card">
              <div class="card-body">
                <ApplicationsTrendChart containerId="criticalTrend" title="Critical Severity Trend" severity="Critical"/>
              </div>
            </div>
          </div>

          <div class='col-xs-12'>
            <div class="card">
              <div class="card-body">
                <ApplicationsTrendChart containerId="highTrend" title="High Severity Trend" severity="High"/>
              </div>
            </div>
          </div>

          <div class='col-xs-12'>
            <div class="card">
              <div class="card-body">
                <BugsClosingTrendChart/>
              </div>
            </div>
          </div>

          <div class='col-xs-12'>
            <div class="card">
              <div class="card-body">
                <StackColumnChart/>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dasboardActions, dispatch)
});
const mapStateToProps = (state) => ({auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(ExecutiveDashboard);
