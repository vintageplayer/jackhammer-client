import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class SeverityCount extends Component {
  render() {
    const {dashboardData, currentOwnerType, currentScanType,} = this.props
    if (dashboardData == null)
      return null;
    return (
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <Link to={"/filters/" + currentOwnerType + "/" + currentScanType + "?severity=Critical"}>
            <div class="info-box critical-bg">
              <i class="fa fa-ban"></i>
              <div class="count">{dashboardData.severityCount.criticalCount}</div>
              <div class="title">
                Critical
              </div>
            </div>
          </Link>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <Link to={"/filters/" + currentOwnerType + "/" + currentScanType + "?severity=High"}>
            <div class="info-box high-bg">
              <i class="fa fa-hand-paper-o"></i>
              <div class="count">{dashboardData.severityCount.highCount}</div>
              <div class="title">
                High
              </div>
            </div>
          </Link>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <Link to={"/filters/" + currentOwnerType + "/" + currentScanType + "?severity=Medium"}>
            <div class="info-box medium-bg">
              <i class="fa fa-exclamation-triangle"></i>
              <div class="count">{dashboardData.severityCount.mediumCount}</div>
              <div class="title">Medium</div>
            </div>
          </Link>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <Link to={"/filters/" + currentOwnerType + "/" + currentScanType + "?severity=Low"}>
            <div class="info-box low-bg">
              <i class="fa fa-minus-circle"></i>
              <div class="count">{dashboardData.severityCount.lowCount}</div>
              <div class="title">Low</div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({dashboardData: state.dashboard.dashboardData});
export default connect(mapStateToProps)(SeverityCount);
