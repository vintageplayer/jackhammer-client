import React, {Component} from 'react'
import {fetchFinding} from '../../Actions/FindingActions'
import {connect} from 'react-redux'
import {formtTime} from '../Common'

class ScanSummary extends Component {
  renderSummary(scanSummary) {
    return (
      <div class="row">
        <div class='col-sm-3'>
          <div>
            <label class="scan-summary">Application Name:</label>
            <span>
              {scanSummary.name}
            </span>
          </div>
          <div>
            <label class="scan-summary">Status:</label>
            <span>{scanSummary.status}</span>
          </div>
        </div>
        <div class='col-sm-4'>
          <div>
            <label class="scan-summary">Start Time:</label>
            <span>{formtTime(scanSummary.startTime)}</span>
          </div>
          <div>
            <label class="scan-summary">End Time:</label>
            <span>{formtTime(scanSummary.endTime)}</span>
          </div>
        </div>
        <div class='col-sm-5'>
          <div>
            <label class="scan-summary">Files Processed:</label>
            <span></span>
          </div>
          <div>
            <label class="scan-summary">Application Languages:</label>
            <span></span>
          </div>
        </div>
        <div class='col-sm-12'>
          <label class="scan-summary">Target:</label>
          <span>{scanSummary.target}</span>
        </div>
      </div>
    );
  }
  render() {
    const {scanSummary} = this.props;
    if (scanSummary != null) {
      return (
        <div class="finding-sumary">
          {this.renderSummary(scanSummary)}
        </div>
      );
    } else {
      return (
        <div class="finding-sumary">
          <h4>
            No Scan Summary
          </h4>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => ({scanSummary: state.findings.findingsSummary});
export default connect(mapStateToProps)(ScanSummary);
