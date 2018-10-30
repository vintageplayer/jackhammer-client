import React, {Component} from 'react'
import TrendChart from './VulnerabilityTrend'
import SummaryChart from './VulnerabilitySummary'
import {fetchAllFindings} from '../../Actions/FindingActions'

export default class RepoCharts extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  componentDidMount() {
    const payload = {
      ownerTypeId: this.props.ownerType,
      scanTypeId: this.props.scanType,
      repoId: this.props.repoId,
      repoPage: true,
      repoChartSummary: true,
      repoFindingsPage: false
    }
    this
      .props
      .dispatch(fetchAllFindings(payload));
  }

  render() {
    return (
      <section class="content">
        <div class="row">
          <div class="col-xs-12">
            <div class="card top-buffer">
              <div class="card-body">
                <TrendChart/>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <div class="card top-buffer">
              <div class="card-body">
                <SummaryChart/>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
