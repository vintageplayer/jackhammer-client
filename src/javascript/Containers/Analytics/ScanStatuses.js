import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class ScanStatuses extends Component {
  displayValue(key) {
    const {analyticsData} = this.props;
    if (analyticsData == null)
      return 0;
    return analyticsData[key];
  }
  render() {
    const vulStatsStyle = {
      marginLeft: 35,
      fontSize: 20
    };
    const vulStatsPanel = {
      paddingTop: 20,
      paddingBottom: 20,
      fontFamily: "Dosis",
    };

    return (
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class='col-xs-2'>
              <span class='text-danger' style={vulStatsStyle}>
                {this.displayValue('runningScans')}
              </span>
              <br/>
              <span class='scan-status'>
                Running Scans
              </span>
            </div>
            <div class='col-xs-2'>
              <span class='text-danger' style={vulStatsStyle}>
                {this.displayValue('completedScans')}
              </span>
              <br/>
              <span class='scan-status'>
                Completed Scans
              </span>
            </div>
            <div class='col-xs-2'>
              <span class='text-danger' style={vulStatsStyle}>
                {this.displayValue('queuedScans')}
              </span>
              <br/>
              <span class='scan-status'>
                Queued Scans
              </span>
            </div>
            <div class='col-xs-3'>
              <span class='text-danger' style={vulStatsStyle}>
                {this.displayValue('totalScans')}
              </span>
              <br/>
              <span class='scan-status'>
                Total Scans Conducted
              </span>
            </div>
            <div class='col-xs-3'>
              <span class='text-danger' style={vulStatsStyle}>
                {this.displayValue('newFindings')}
              </span>
              <br/>
              <span class='scan-status'>
                New Vulnerabilities
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({analyticsData: state.analytics.analyticsData});
export default connect(mapStateToProps)(ScanStatuses);
