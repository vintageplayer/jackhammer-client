import React, {Component} from 'react'
import * as scanActions from '../../Actions/ScanActions'
import {BootstrapTable} from 'react-bootstrap-table'
import {renderToAddPage, formatDate, editFormatter, createCustomToolBar,} from '../Common'
import {severityCounts} from './SeverityCounts'
import {toastr} from 'react-redux-toastr'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'

const progressBarStyle = {
  width: "100%"
}
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      sizePerPage: 10,
      page: 1,
      totalSize: 0,
      orderBy: "createdAt",
      sortDirection: 'DESC',
      searchTerm: null,
      reloadDuration: 0,
      firstAutoReload: false,
    };
    this.fetchData = this
      .fetchData
      .bind(this);
    this.handlePageChange = this
      .handlePageChange
      .bind(this);
    this.handleSizePerPageChange = this
      .handleSizePerPageChange
      .bind(this);
    this.deleteFormatter = this
      .deleteFormatter
      .bind(this);
    this.deleteSelectedScan = this
      .deleteSelectedScan
      .bind(this);
    this.startScanAction = this
      .startScanAction
      .bind(this);
    this.viewFindings = this
      .viewFindings
      .bind(this)
    this.scanTitleFormatter = this
      .scanTitleFormatter
      .bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
  }
  componentDidMount() {
    const {ownerType, scanType,} = this.props;
    this.fetchData(ownerType, scanType);
    this.interval = setInterval(() => {
      this.fetchData(ownerType, scanType);
    }, 30000);
  }
  deleteSelectedScan(event, scanId) {
    this
      .props
      .actions
      .deleteScan(scanId);
  }
  startScanAction(event, scanId) {
    const payload = {
      status: 'Queued'
    };
    const {ownerType, scanType,} = this.props;
    this
      .props
      .actions
      .updateScan(payload, scanId);
    this.fetchData(ownerType, scanType);
  }
  viewFindings(event, scanId) {
    this
      .context
      .router
      .history
      .push("/findings/" + scanId, {state: 'state'});
  }
  fetchData(ownerType, scanType, page = this.state.page, sizePerPage = this.state.sizePerPage, offset = this.state.offset, searchTerm = this.state.searchTerm, orderBy = this.state.orderBy, sortDirection = this.state.sortDirection) {
    offset = (page - 1) * sizePerPage;
    const payload = {
      offset: offset,
      limit: sizePerPage,
      orderBy: orderBy,
      sortDirection: sortDirection,
      searchTerm: searchTerm,
      ownerTypeId: ownerType,
      scanTypeId: scanType
    }
    this
      .props
      .actions
      .fetchAllScans(payload, scanType);

    this.setState({
      totalSize: this.props.totalSize,
      offset: offset,
      sizePerPage: sizePerPage,
      page: page,
      searchTerm: searchTerm,
      orderBy: orderBy,
      sortDirection: sortDirection
    })
  }
  handlePageChange(page, sizePerPage) {
    this.fetchData(this.props.ownerType, this.props.scanType, page, sizePerPage);
  }

  handleSizePerPageChange(sizePerPage) {
    // When changing the size per page always navigating to the first page
    this.fetchData(this.props.ownerType, this.props.scanType, 1, sizePerPage);
  }

  handleSearchChange = (searchText, colInfos, multiColumnSearch) => {
    if (searchText.length >= 3 || searchText.length == 0) {
      this.fetchData(this.props.ownerType, this.props.scanType, 1, this.state.sizePerPage, 0, searchText, this.state.orderBy, this.state.sortDirection);
    }
  }
  handleSortChange = (sortName, sortOrder) => {
    this.fetchData(this.props.ownerType, this.props.scanType, 1, this.state.sizePerPage, 0, this.state.searchTerm, sortName, sortOrder);
  }
  deleteFormatter(cell, row) {
    return (
      <a class="btn btn-danger" aria-label="Delete" onClick={this
        .deleteSelectedScan
        .bind(this, event, cell)}>
        <i class="fa fa-trash-o" aria-hidden="true"></i >
      </a>
    );
  }
  scanActionFormatter = (cell, row) => {
    if (row.status === 'Progress') {
      return (
        <div class="progress">
          <div class="progress-bar progress-bar-striped progress-bar-animated progress-bar-green" role="progressbar" style={progressBarStyle} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
            Scan in progress...
          </div>
        </div>
      );
    } else if (row.status === 'Queued') {
      return (
        <span class='text-primary'>
          Queued
        </span>
      );
    } else if (row.status === 'Pending') {
      return (
        <a class="btn btn-sm btn-success btn-scan-page" aria-label="Delete" onClick={this
          .startScanAction
          .bind(this, event, cell)}>
          Start Scan
        </a>
      );
    } else {
      return (
        <a class="btn btn-sm btn-primary btn-scan-page" aria-label="Start Scan" onClick={this
          .startScanAction
          .bind(this, event, cell)}>
          Re-scan
        </a>
      );
    }
  }
  viewResultsFormatter = (cell, row) => {
    return (
      <a class="btn btn-sm btn-primary btn-scan-page" aria-label="View Results" onClick={this
        .viewFindings
        .bind(this, event, cell)}>
        Show Results
      </a>
    );
  }
  showSeveritiesCount = (cell, row) => {
    return severityCounts(cell, row);
  }
  renderActionColumn(createAllowed) {
    if (createAllowed) {
      return (
        <TableHeaderColumn dataField="id" dataFormat={this.scanActionFormatter}>Action</TableHeaderColumn>
      );
    }
  }
  renderDeleteColumn(deleteAllowed) {
    return (
      <TableHeaderColumn dataField='id' dataFormat={this.deleteFormatter}>Delete</TableHeaderColumn>
    );
  }
  scanTitleFormatter(cell, row) {
    var repoLinkParameters = [];
    repoLinkParameters.push(this.props.ownerType);
    repoLinkParameters.push(this.props.scanType);
    return (
      <Link to={{
        pathname: '/repo_vulnerability_trend/' + repoLinkParameters.join("/"),
        search: '?repoId=' + row.repoId
      }}>
        {row.name}
      </Link>
    );
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.ownerType != nextProps.ownerType || this.props.scanType != nextProps.scanType) {
      this.fetchData(nextProps.ownerType, nextProps.scanType);
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.fetchData(nextProps.ownerType, nextProps.scanType);
      }, 30000);
    }
    if (nextProps.deleteResponse) {
      this.fetchData(nextProps.ownerType, nextProps.scanType);
      toastr.success('Scan deleted successfully');
    }
    if (nextProps.updateResponse) {
      this.fetchData(this.props.ownerType, this.props.scanType);
      toastr.success('Scanning started...');
    }
  }
  renderShowResultsColumn(readFindingsAllowed) {
    if (readFindingsAllowed) {
      return (
        <TableHeaderColumn dataField="id" dataFormat={this.viewResultsFormatter}>Show Results</TableHeaderColumn>
      )
    }
  }
  renderDeleteOption(deleteAllowed) {
    if (deleteAllowed) {
      return (
        <TableHeaderColumn dataField='id' dataFormat={this.deleteFormatter}>Delete</TableHeaderColumn>
      );
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const AddScanUrl = "/add_scan/" + this.props.ownerType + "/" + this.props.scanType;
    const options = {
      onPageChange: this.handlePageChange,
      onSizePerPageList: this.handleSizePerPageChange,
      page: this.state.page,
      sizePerPage: this.state.sizePerPage,
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text,,,,
      onSearchChange: this.handleSearchChange,
      onSortChange: this.handleSortChange
    };
    const {fetchedScans} = this.props;
    const {totalSize} = this.props;
    const {createAllowed} = this.props;
    const {deleteAllowed} = this.props;
    const {readAllowed} = this.props;
    const {readFindingsAllowed} = this.props;
    if (createAllowed) {
      options['toolBar'] = (props) => createCustomToolBar(props, this.context, true, AddScanUrl, "Add Scan");
    }
    return (
      <BootstrapTable height="auto" data={fetchedScans} options={options} fetchInfo={{
        dataTotalSize: totalSize
      }} search remote pagination striped hover bordered={false}>
        <TableHeaderColumn dataField="name" isKey dataSort dataFormat={this.scanTitleFormatter}>Title</TableHeaderColumn>
        <TableHeaderColumn dataField="createdAt" dataFormat={(cell, row) => formatDate(cell, row)} dataSort>Created</TableHeaderColumn>
        <TableHeaderColumn dataField="updatedAt" dataFormat={(cell, row) => formatDate(cell, row)} dataSort>Updated</TableHeaderColumn>
        <TableHeaderColumn dataField="status" dataSort>Status</TableHeaderColumn>
        <TableHeaderColumn dataField="statusReason">Failed Reason</TableHeaderColumn>
        <TableHeaderColumn dataField="id" dataAlign='center' width="250px" dataFormat={this.showSeveritiesCount}>Results</TableHeaderColumn>
        {this.renderActionColumn(createAllowed)}
        {this.renderShowResultsColumn(readFindingsAllowed)}
        {this.renderDeleteOption(deleteAllowed)}
      </BootstrapTable>
    )
  }
}
const mapStateToProps = (state) => ({
  fetchedScans: state.scans.fetchedScans,
  readAllowed: state.scans.readAllowed,
  createAllowed: state.scans.createAllowed,
  deleteAllowed: state.scans.deleteAllowed,
  totalSize: state.scans.totalSize,
  deleteResponse: state.scans.deleteResponse,
  updateResponse: state.scans.updateResponse,
  readFindingsAllowed: state.scans.readFindingsAllowed,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(scanActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(List);
