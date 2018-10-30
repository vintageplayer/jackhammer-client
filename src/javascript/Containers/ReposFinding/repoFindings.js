import React, {Component} from 'react'
import Breadcrumb from './Breadcrumb'
import RightNav from './TopNav'
import RepoCharts from './RepoCharts'
import List from './List'
import '../../../stylesheets/finding-repos.css'

export default class Index extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  render() {
    var searchParams = new URLSearchParams(this.context.router.history.location.search);
    var {ownerType, scanType, group,} = this.props.match.params;
    var {path} = this.props.match;
    var repoId = searchParams.get("repoId");
    var severity = searchParams.get("severity");
    return (
      <div class="page-wrapper">
        <RightNav ownerType={ownerType} scanType={scanType} repoId={repoId} group={group} path={path}/>
        <Breadcrumb ownerType={ownerType} scanType={scanType} repoId={repoId} group={group} pageTitle={"Severity Findings"}/>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="card top-buffer">
                <div class="card-body">
                  <List ownerType={ownerType} scanType={scanType} repoId={repoId} group={group} severity={severity}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
