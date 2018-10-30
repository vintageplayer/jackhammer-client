import React, {Component} from 'react'
import Breadcrumb from './Breadcrumb'
import RightNav from './TopNav'
import RepoCharts from './RepoCharts'
import {fetchAllFindings, deleteFinding} from '../../Actions/FindingActions'
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr'
import '../../../stylesheets/finding-repos.css'

function getcurrentRepo(location) {
  var searchParams = new URLSearchParams(location);
  var repoId = searchParams.get("repoId");
  return repoId;
}
class ToolResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteFormatter = this
      .deleteFormatter
      .bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
  }
  componentDidMount() {
    var {ownerType, scanType, group} = this.props.match.params;
    const payload = {
      ownerTypeId: ownerType,
      scanTypeId: scanType,
      repoId: getcurrentRepo(this.context.router.history.location.search),
      repoPage: true,
      repoToolResults: true,
    }
    this
      .props
      .dispatch(fetchAllFindings(payload));
  }
  deleteSelectedToolFindings(event, toolName) {
    var {ownerType, scanType, group} = this.props.match.params;
    event.preventDefault();
    this
      .props
      .dispatch(deleteFinding(0, toolName, ownerType, scanType, getcurrentRepo(this.context.router.history.location.search)));
    const payload = {
      ownerTypeId: ownerType,
      scanTypeId: scanType,
      repoId: this.getcurrentRepo(this.context.router.history.location.search),
      repoPage: true,
      repoToolResults: true,
    }
    this
      .props
      .dispatch(fetchAllFindings(payload));
  }
  deleteFormatter(cell, row) {
    return (
      <a class="btn btn-danger" aria-label="Delete" onClick={this
        .deleteSelectedToolFindings
        .bind(this, event, cell)}>
        <i class="fa fa-trash-o" aria-hidden="true"></i >
      </a>
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteResponse) {
      toastr.info("Selected tool results are deleted");
    }
  }
  render() {
    var {ownerType, scanType, group} = this.props.match.params;
    var {path} = this.props.match;
    const {findingsSummary} = this.props;
    const repoToolResults = findingsSummary
      ? findingsSummary.repoToolResults
      : null;
    return (
      <div class="page-wrapper">
        <RightNav ownerType={ownerType} scanType={scanType} repoId={getcurrentRepo(this.context.router.history.location.search)} group={group} path={path}/>
        <Breadcrumb ownerType={ownerType} scanType={scanType} repoId={getcurrentRepo(this.context.router.history.location.search)} group={group} pageTitle={"Tool Results"}/>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="card top-buffer">
                <div class="card-body">
                  <BootstrapTable height="auto" data={repoToolResults} striped hover bordered={false}>
                    <TableHeaderColumn isKey dataField="toolName">Tool Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="count">Vulnerability Count</TableHeaderColumn>
                    <TableHeaderColumn dataField="toolName" dataFormat={this.deleteFormatter}>Delete</TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({findingsSummary: state.findings.findingsSummary, deleteResponse: state.findings.deleteResponse});

export default connect(mapStateToProps)(ToolResults);
