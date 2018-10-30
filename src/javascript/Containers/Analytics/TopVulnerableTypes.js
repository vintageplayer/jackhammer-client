import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class TopVulnerableTypes extends Component {
  getSeverityClass(severity) {
    var severityClass = severity.toLowerCase() + '-badge';
    var commonClasses = "severity-badge light text-center ";
    return commonClasses + severityClass
  }
  renderTopVulnerableTypes(analyticsData, currentOwnerType) {
    if (analyticsData === null)
      return null;
    var topVulnerableTypes = analyticsData.topVulnerableTypes;
    return (topVulnerableTypes.map((vulnerableType, index) => <tr key={index}>
      <td>
        <Link to={"/filters/" + currentOwnerType + "?vulnerableType=" + vulnerableType.vulnerabilityType}>
          {vulnerableType.vulnerabilityType}
        </Link>
      </td>
      <td>
        <span class={this.getSeverityClass(vulnerableType.severity)} title={vulnerableType.severity}>
          {vulnerableType.count}
        </span>
      </td>
      <td>
        {vulnerableType.severity}
      </td>
    </tr>));
  }
  render() {
    const {analyticsData, currentOwnerType} = this.props;
    return (
      <div class="row">
        <div class="col-xs-12">
          <div class="card">
            <h4 class="card-title">
              Top Vulnerabilities
            </h4>
            <div class="card-body">
              <table class='table'>
                <thead>
                  <tr>
                    <th>Bug Type</th>
                    <th>Severity Count</th>
                    <th>Severity Type</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderTopVulnerableTypes(analyticsData, currentOwnerType)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({analyticsData: state.analytics.analyticsData});
export default connect(mapStateToProps)(TopVulnerableTypes);
