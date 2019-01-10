import React, {Component} from 'react'
import Breadcrumb from './Breadcrumb'
import FindingSummary from './FindingSummary'
import Comment from './Comment'
import Tag from './Tag'
import Upload from './Upload'
import {Pagination} from 'react-bootstrap'
import {fetchAllFindings, updateFinding, fetchFinding} from '../../Actions/FindingActions'
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr'
import '../../../stylesheets/finding.css'

class FindingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      sizePerPage: 1,
      page: 1,
      totalSize: 0,
    };
    this.handlePageChange = this
      .handlePageChange
      .bind(this);
    this.fetchData = this
      .fetchData
      .bind(this);
    this.handleStatus = this
      .handleStatus
      .bind(this);
    this.handleNotExploitable = this
      .handleNotExploitable
      .bind(this);
    this.handleFalsePositive = this
      .handleFalsePositive
      .bind(this);
    this.handlePublishToJira = this
      .handlePublishToJira
      .bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
  }

  handleStatus(event) {
    const payload = {
      status: event.target.value,
      id: this.props.match.params.id,
    };
    this.updateFinding(payload);
    this.setState({flashMessage: 'Finding Status updated successfully'});
  }
  handleNotExploitable() {
    const payload = {
      notExploitable: true,
      id: this.props.match.params.id,
    };
    this.updateFinding(payload);
    this.setState({flashMessage: 'Finding change to NotExploitable successfully'});
  }
  handleFalsePositive() {
    const payload = {
      isFalsePositive: true,
      id: this.props.match.params.id,
    };
    this.updateFinding(payload);
    this.setState({flashMessage: 'Finding change to FalsePositive successfully'});
  }
  handlePublishToJira() {
    const payload = {
      pushedToJira: true,
      id: this.props.match.params.id
    };
    this.updateFinding(payload);
    this.setState({flashMessage: 'Finding push to jira successfully'});
  }
  updateFinding(payload) {
    const {findingId} = this.props.match.params;
    this
      .props
      .dispatch(updateFinding(payload, payload.id || findingId));
  }
  fetchData(page = this.state.page, sizePerPage = this.state.sizePerPage, offset = this.state.offset) {
    offset = (page - 1) * sizePerPage;
    const {parentId} = this.props.match.params;
    var searchParams = new URLSearchParams(this.context.router.history.location.search);
    const payload = {
      offset: offset,
      limit: sizePerPage,
      orderBy: "name",
    }
    if (searchParams.get('sourcePage') === 'repo') {
      payload['repoId'] = parseInt(parentId);
      payload['repoPage'] = true;
    } else {
      payload['scanId'] = parseInt(parentId);
      payload['repoPage'] = false;
    }
    this
      .props
      .dispatch(fetchAllFindings(payload));
    this.setState({offset: offset, sizePerPage: 1, page: page,});
  }
  handlePageChange(pageNumber) {
    this.fetchData(pageNumber, 1);
  }
  renderPagination(finding) {
    if (finding != null) {
      return (<Pagination boundaryLinks={true} next="Next" prev="Prev" activePage={this.state.page} items={finding.totalSize} maxButtons={5} last="Last" onSelect={this.handlePageChange}/>);
    }
    return null;
  }
  fetchFindingStatus(finding) {
    if (finding === null) {
      return null;
    }
    return (
      <span class={"badge finding-" + finding
        .status
        .toLowerCase()
        .split(" ")
        .join("-") + "-status"}>
        {finding.status}
      </span>
    )
  }
  fetchModifiedBy(finding) {
    if (finding === null) {
      return null;
    }
    return finding.modifiedBy
  }

  renderStatusList(finding) {
    if (finding && finding.updateFinding) {
      return (
        <div class="col-xs-4">
          Change Status:
          <select class="status-control" name="status" onChange={this.handleStatus}>
            <option value="">Select Status</option>
            <option value="Open">Open</option>
            <option value="Close">Close</option>
            <option value="Fix in progress">Fix in progress</option>
            <option value="Deferred">Deferred</option>
          </select>
        </div>
      )
    }
  }
  renderNotExploitable(finding) {
    if (finding && finding.notExploitable) {
      return (
        <button disabled class="btn btn-danger">Mark Not Exploitable</button>
      )
    } else {
      return (
        <button class="btn btn-danger" onClick={this.handleNotExploitable}>Mark Not Exploitable</button>
      )
    }
  }
  renderIsFalsePositive(finding) {
    if (finding && finding.isFalsePositive) {
      return (
        <button disabled class="btn btn-danger">Mark False Positive</button>
      )
    } else {
      return (
        <button class="btn btn-danger" onClick={this.handleFalsePositive}>Mark False Positive</button>
      )
    }
  }
  renderPublishToJira(finding) {
    if (finding && finding.pushedToJira) {
      return (
        <button disabled class="btn btn-danger">Publish to Jira</button>
      )
    } else {
      return (
        <button class="btn btn-danger" onClick={this.handlePublishToJira}>Publish to Jira</button>
      )
    }
  }
  renderFindingSummary(findingId, sourcePage) {
    return (<FindingSummary findingId={findingId} sourcePage={sourcePage}/>)
  }
  renderButtons(finding) {
    if (finding && finding.updateFinding) {
      return (
        <div class="row top-buffer">
          <div class="col-xs-4">
            {this.renderIsFalsePositive(finding)}
          </div>
          <div class="col-xs-4">
            {this.renderNotExploitable(finding)}
          </div>
          <div class="col-xs-4">
            {this.renderPublishToJira(finding)}
          </div>
        </div>
      );
    }
  }
  renderComments(finding, id) {
    if (finding && finding.readComments) {
      return (
        <div class="col-xs-12">
          <div class="card">
            <div class="card-title">
              Comments
            </div>
            <div class="card-body">
              <Comment finding={finding} findingId={id}/>
            </div>
          </div>
        </div>
      )
    }
  }
  renderUploads(finding, id) {
    if (finding && finding.readUploads) {
      return (
        <div class="col-xs-12">
          <div class="card">
            <div class="card-title">
              Uploads
            </div>
            <div class="card-body">
              <Upload finding={finding} findingId={id}/>
            </div>
          </div>
        </div>
      )
    }
  }
  renderTags(finding, id) {
    if (finding && finding.readTags) {
      return (
        <div class="col-xs-12">
          <div class="card">
            <div class="card-title">
              Tags
            </div>
            <div class="card-body">
              <Tag finding={finding} findingId={id}/>
            </div>
          </div>
        </div>
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateResponse) {
      this
        .props
        .dispatch(fetchFinding(this.props.match.params.id, this.state.page));
      toastr.info(this.state.flashMessage);
    }
  }
  render() {
    const {id} = this.props.match.params;
    const {parentId} = this.props.match.params;
    const {finding} = this.props;
    var searchParams = new URLSearchParams(this.context.router.history.location.search);
    var sourcePage = searchParams.get('sourcePage')

    return (
      <div class="page-wrapper">
        {/* <Breadcrumb params={this.props}/> */}
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="card">
                <div class="card-title">
                  Finding Status
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-xs-4">
                      Current Status: {this.fetchFindingStatus(finding)}
                    </div>
                    {this.renderStatusList(finding)}
                    <div class="col-xs-4">
                      Last Modified By: {this.fetchModifiedBy(finding)}
                    </div>
                  </div>
                  {this.renderButtons(finding)}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="card">
                <div class="card-title">
                  Finding Summary
                </div>
                <div class="card-body">
                  {this.renderFindingSummary(id, sourcePage)}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            {this.renderComments(finding, id)}
          </div>
          <div class="row">
            {this.renderUploads(finding, id)}
          </div>
          <div class="row">
            {this.renderTags(finding, id)}
          </div>
          <div class="row pagination pull-right">
            {this.renderPagination(finding)}
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({finding: state.findings.finding, updateResponse: state.findings.updateResponse,});

export default connect(mapStateToProps)(FindingDetail);
