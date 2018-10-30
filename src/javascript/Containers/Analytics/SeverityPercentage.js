import React, {Component} from 'react'
import CircularProgressbar from 'react-circular-progressbar'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import 'react-circular-progressbar/dist/styles.css'

function calculateTotal(analyticsData) {
  if (analyticsData == null)
    return 0;
  if (analyticsData == null)
    return 0;
  var totalCount = analyticsData.severityCount.criticalCount + analyticsData.severityCount.highCount + analyticsData.severityCount.mediumCount + analyticsData.severityCount.lowCount + analyticsData.severityCount.infoCount;
  return totalCount;
}
const severityDivider = {
  marginTop: 0,
  marginBottom: 1,
  width: 50,
}
class SeverityPercentage extends Component {
  calculateSeverityPercentage(currentSeverityCount) {
    const {analyticsData} = this.props;
    if (analyticsData === null)
      return 0;
    var totalCount = calculateTotal(analyticsData);
    var severityCount = analyticsData.severityCount[currentSeverityCount];
    if (severityCount === 0 || totalCount === 0)
      return 0;
    var percentage = (severityCount / totalCount) * 100;
    return percentage.toFixed(2);
  }
  getSeverityCount(currentSeverityCount) {
    const {analyticsData} = this.props;
    if (analyticsData === null)
      return 0;
    return analyticsData.severityCount[currentSeverityCount];
  }
  componentDidMount() {}
  render() {
    const {analyticsData, currentOwnerType,} = this.props;
    return (
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class='col-xs-1'></div>
            <div class='col-xs-2 circle'>
              <CircularProgressbar initialAnimation={true} percentage={this.calculateSeverityPercentage("criticalCount")} styles={{
                path: {
                  stroke: `rgba(255, 77, 77)`
                }
              }}/>
              <span>
                {this.getSeverityCount("criticalCount")}
              </span>
              <hr style={severityDivider}/>
              <span>
                <Link to={"/filters/" + currentOwnerType + "?severity=Critical"}>
                  Critical
                </Link>
              </span>
            </div>
            <div class='col-xs-2 circle'>
              <CircularProgressbar initialAnimation={true} percentage={this.calculateSeverityPercentage("highCount")} styles={{
                path: {
                  stroke: `rgba(255, 112, 77)`
                }
              }}/>
              <span>
                {this.getSeverityCount("criticalCount")}
              </span>
              <hr style={severityDivider}/>
              <span>
                <Link to={"/filters/" + currentOwnerType + "?severity=High"}>
                  High
                </Link>
              </span>
            </div>
            <div class='col-xs-2 circle'>
              <CircularProgressbar initialAnimation={true} percentage={this.calculateSeverityPercentage("mediumCount")} styles={{
                path: {
                  stroke: `rgba(247, 163, 92)`
                }
              }}/>
              <span>
                {this.getSeverityCount("mediumCount")}
              </span>
              <hr style={severityDivider}/>
              <span>
                <Link to={"/filters/" + currentOwnerType + "?severity=Medium"}>
                  Medium
                </Link>
              </span>
            </div>
            <div class='col-xs-2 circle'>
              <CircularProgressbar initialAnimation={true} percentage={this.calculateSeverityPercentage("lowCount")} styles={{
                path: {
                  stroke: `rgba(124, 181, 236)`
                }
              }}/>
              <span>
                {this.getSeverityCount("lowCount")}
              </span>
              <hr style={severityDivider}/>
              <span>
                <Link to={"/filters/" + currentOwnerType + "?severity=Low"}>
                  Low
                </Link>
              </span>
            </div>
            <div class='col-xs-2 circle'>
              <CircularProgressbar percentage={this.calculateSeverityPercentage("infoCount")} initialAnimation={true} styles={{
                path: {
                  stroke: `rgba(144, 237, 125)`,
                  strokeDasharray: 0,
                  strokeDashoffset: 0
                }
              }}/>
              <span>
                {this.getSeverityCount("infoCount")}
              </span>
              <hr style={severityDivider}/>
              <span>
                <Link to={"/filters/" + currentOwnerType + "?severity=Info"}>
                  Info
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({analyticsData: state.analytics.analyticsData});
export default connect(mapStateToProps)(SeverityPercentage);
