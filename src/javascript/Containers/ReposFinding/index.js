import React, {Component} from 'react'
import Breadcrumb from './Breadcrumb'
import TopNav from './TopNav'
import RepoCharts from './RepoCharts'
import '../../../stylesheets/finding-repos.css'

export default class Index extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  render() {
    var searchParams = new URLSearchParams(this.context.router.history.location.search);
    var {ownerType, scanType, group} = this.props.match.params;
    var {path} = this.props.match;
    var repoId = searchParams.get("repoId");
    return (
      <div class="page-wrapper">
        <TopNav ownerType={ownerType} scanType={scanType} repoId={repoId} group={group} path={path}/>
        <Breadcrumb ownerType={ownerType} scanType={scanType} repoId={repoId} group={group} pageTitle={"Vulnerability Summary"}/>
        <RepoCharts ownerType={ownerType} scanType={scanType} repoId={repoId} group={group} dispatch={this.props.dispatch}/>
      </div>
    )
  }
}
