import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class TopVulnerableRepos extends Component {
  renderRepoList(analyticsData, currentOwnerType) {
    if (analyticsData === null)
      return null;
    var TopVulnerableRepos = analyticsData.repoList;
    return (TopVulnerableRepos.map((repo) => <tr key={repo.id}>
      <td>
        <Link to={"/repo_vulnerability_trend/" + currentOwnerType + "?repoId=" + repo.id}>
          {repo.name}
        </Link>
      </td>
      <td>
        <span class="severity-badge light critical-badge text-center" title="Critical">
          {repo.severityCount.criticalCount}
        </span>
      </td>
      <td>
        <span class="severity-badge light high-badge text-center" title="High">
          {repo.severityCount.highCount}
        </span>
      </td>
      <td>
        <span class="severity-badge light medium-badge text-center" title="Medium">
          {repo.severityCount.mediumCount}
        </span>
      </td>
      <td>
        <span class="severity-badge light low-badge text-center" title="Low">
          {repo.severityCount.lowCount}
        </span>
      </td>
      <td>
        <span class="severity-badge light info-badge text-center" title="Info">
          {repo.severityCount.infoCount}
        </span>
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
              Top Vulnerable Repos
            </h4>
            <div class="card-body">
              <table class='table border-less'>
                <thead>
                  <tr>
                    <th>
                      Repo Name
                    </th>
                    <th>
                      Critical Count
                    </th>
                    <th>
                      High Count
                    </th>
                    <th>
                      Medium Count
                    </th>
                    <th>
                      Low Count
                    </th>
                    <th>
                      Info Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderRepoList(analyticsData, currentOwnerType)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({analyticsData: state.analytics.analyticsData})
export default connect(mapStateToProps)(TopVulnerableRepos);
