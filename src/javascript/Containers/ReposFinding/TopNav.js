import React, {Component} from 'react'
import * as TaskActions from '../../Actions/TaskActions'
import * as scanTypeActions from '../../Actions/ScanTypeActions'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

function getActiveClass(currentPath, linkName) {
  if (currentPath.includes(linkName)) {
    return "active";
  } else {
    return "";
  }
}

class RightNav extends Component {
  componentDidMount() {
    this
      .props
      .actions
      .fetchAllTasks({limit: -1});
  }
  renderRighNavLinks(repoLinkParameters) {
    if (repoLinkParameters.length === 0)
      return null;
    return (
      <div class="col-md-12">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto" role="tablist">
              <li class={"nav-item " + getActiveClass(this.props.path, "repo_vulnerability_trend")}>
                <Link class="nav-link" to={{
                  pathname: '/repo_vulnerability_trend/' + repoLinkParameters.join("/"),
                  search: '?repoId=' + this.props.repoId,
                  state: {
                    fromDashboard: true
                  }
                }}>
                  Vulnerability Summary
                </Link>
              </li>
              <li class={"nav-item " + getActiveClass(this.props.path, "tool_results")}>
                <Link class="nav-link" to={{
                  pathname: '/tool_results/' + repoLinkParameters.join("/"),
                  search: '?repoId=' + this.props.repoId,
                  state: {
                    fromDashboard: true
                  }
                }}>
                  Tool Results
                </Link>
              </li>
              <li class={"nav-item dropdown " + getActiveClass(this.props.path, "repo_findings")}>
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Repo Results
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li class="dropdown-item">
                    <Link to={{
                      pathname: '/repo_findings/' + repoLinkParameters.join("/"),
                      search: '?repoId=' + this.props.repoId + '&severity=Critical',
                      state: {
                        fromDashboard: true
                      }
                    }}>
                      Critical
                    </Link>
                  </li>
                  <li class="dropdown-item">
                    <Link to={{
                      pathname: '/repo_findings/' + repoLinkParameters.join("/"),
                      search: '?repoId=' + this.props.repoId + '&severity=High',
                      state: {
                        fromDashboard: true
                      }
                    }}>
                      High
                    </Link>
                  </li>
                  <li class="dropdown-item">
                    <Link to={{
                      pathname: '/repo_findings/' + repoLinkParameters.join("/"),
                      search: '?repoId=' + this.props.repoId + '&severity=Medium',
                      state: {
                        fromDashboard: true
                      }
                    }}>
                      Medium
                    </Link>
                  </li>
                  <li class="dropdown-item">
                    <Link to={{
                      pathname: '/repo_findings/' + repoLinkParameters.join("/"),
                      search: '?repoId=' + this.props.repoId + '&severity=Low',
                      state: {
                        fromDashboard: true
                      }
                    }}>
                      Low
                    </Link>
                  </li>
                  <li>
                    <Link to={{
                      pathname: '/repo_findings/' + repoLinkParameters.join("/"),
                      search: '?repoId=' + this.props.repoId + '&severity=Info',
                      state: {
                        fromDashboard: true
                      }
                    }}>
                      Info
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
  render() {
    const {fetchedTasks} = this.props;
    var {ownerType, scanType, group,} = this.props;
    var repoLinkParameters = [];
    if (ownerType) {
      repoLinkParameters.push(ownerType);
      repoLinkParameters.push(scanType);
      if (group)
        repoLinkParameters.push(group);
      }
    return (
      <div class="row hdr-nav-bar">
        {this.renderRighNavLinks(repoLinkParameters)}
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, scanTypeActions, TaskActions), dispatch)
  };
}
const mapStateToProps = (state) => ({fetchedTasks: state.tasks.fetchedTasks})
export default connect(mapStateToProps, mapDispatchToProps)(RightNav)
