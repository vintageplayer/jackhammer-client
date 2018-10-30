import React, {Component} from 'react'
import Breadcrumb from './Breadcrumb'
import RightNav from './TopNav'
import * as findingActions from '../../Actions/FindingActions'
import {Button} from 'react-bootstrap'
import {fetchAllFindings, updateFinding,} from '../../Actions/FindingActions'
import {renderToAddPage, formatDate, editFormatter, createCustomToolBar} from '../Common'
import {severityBadgeStyle} from '../CSSModules'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toastr} from 'react-redux-toastr'
import {Link} from 'react-router-dom'

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      sizePerPage: 10,
      page: 1,
      totalSize: 0,
      orderBy: "name",
      sortDirection: 'ASC',
      searchTerm: null,
      selectedFindings: {},
      falsePositiveBtn: true,
      notExploitableBtn: true,
      checkedAll: false
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
    this.viewFinding = this
      .viewFinding
      .bind(this)
    this.selectAll = this
      .selectAll
      .bind(this);
    this.selectOne = this
      .selectOne
      .bind(this);
    this.changeFindingStatus = this
      .changeFindingStatus
      .bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
  }

  viewFinding(event, row) {
    this
      .context
      .router
      .history
      .push("/finding_detail/" + row.repoId + "/" + row.id + '?sourcePage=repo', {state: 'state'});
  }
  componentWillMount() {
    this.fetchData(this.props.severity);
  }
  fetchData(severity, page = this.state.page, sizePerPage = this.state.sizePerPage, offset = this.state.offset, searchTerm = this.state.searchTerm, orderBy = this.state.orderBy, sortDirection = this.state.sortDirection) {
    offset = (page - 1) * sizePerPage;
    const payload = {
      offset: offset,
      limit: sizePerPage,
      orderBy: orderBy,
      sortDirection: sortDirection,
      searchTerm: searchTerm,
      ownerTypeId: this.props.ownerType,
      scanTypeId: this.props.scanType,
      repoId: this.props.repoId,
      severity: severity,
      repoPage: true,
      repoFindingsPage: true,
    }
    this
      .props
      .dispatch(fetchAllFindings(payload));
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
    this.fetchData(this.props.severity, page, sizePerPage);
  }

  changeFindingStatus(event) {
    var status = event.target.name;
    var payload = {
      bulkUpdate: true
    }
    var ids = [];
    for (var findingId in this.state.selectedFindings) {
      if (this.state.selectedFindings[findingId])
        ids.push(parseInt(findingId));
      }
    if (status === 'falsePositive') {
      payload['isFalsePositive'] = true;
    }
    if (status === 'notExploitable') {
      payload['notExploitable'] = true;
    }
    payload['ids'] = ids;
    this
      .props
      .dispatch(updateFinding(payload, 0));
  }

  handleSizePerPageChange(sizePerPage) {
    // When changing the size per page always navigating to the first page
    this.fetchData(this.props.severity, 1, sizePerPage);
  }
  handleSearchChange = (searchText, colInfos, multiColumnSearch) => {
    if (searchText.length >= 3 || searchText.length == 0) {
      this.fetchData(this.props.severity, 1, this.state.sizePerPage, 0, searchText, this.state.orderBy, this.state.sortDirection);
    }
  }
  handleSortChange = (sortName, sortOrder) => {
    this.fetchData(this.props.severity, 1, this.state.sizePerPage, 0, this.state.searchTerm, sortName, sortOrder);
  }
  selectCheckBoxRender = (cell, row) => {
    return (<input id={cell} type="checkbox" checked={this.state.selectedFindings[cell]} defaultChecked={false} onChange={this.selectOne}/>);
  }
  viewFindingDataFormat = (cell, row) => {
    return (
      <a class="btn btn-sm btn-primary btn-scan-page" aria-label="Delete" onClick={this
        .viewFinding
        .bind(this, event, row)}>
        View Finding
      </a>
    );
  }
  severityDataFormat = (cell, row) => {
    return (
      <span class={'badge ' + cell.toLowerCase() + '-severity'} style={severityBadgeStyle}>
        {cell}
      </span>
    );
  }
  selectAll() {
    var selectedFindings = {}
    var needToDisableBtns = true;
    if (!this.state.checkedAll) {
      for (var findingId in this.state.selectedFindings) {
        selectedFindings[findingId] = true;
        needToDisableBtns = false;
      }
    } else {
      for (var findingId in this.state.selectedFindings) {
        selectedFindings[findingId] = false;
      }
    }
    this.setState({
      selectedFindings: selectedFindings,
      checkedAll: !this.state.checkedAll,
      notExploitableBtn: needToDisableBtns,
      falsePositiveBtn: needToDisableBtns
    });
  }
  selectOne(event) {
    var selectedFindings = this.state.selectedFindings;
    if (!this.state.selectedFindings[event.target.id]) {
      selectedFindings[event.target.id] = true;
    } else {
      selectedFindings[event.target.id] = false;
    }
    var selectedAtLeastOne = false;
    for (var findingId in this.state.selectedFindings) {
      if (selectedFindings[findingId]) {
        selectedAtLeastOne = true;
        break;
      }
    }
    this.setState({
      selectedFindings: selectedFindings,
      notExploitableBtn: !selectedAtLeastOne,
      falsePositiveBtn: !selectedAtLeastOne
    });
  }
  renderFlasePositiveBtn(findingsUpdateAllowed) {
    if (findingsUpdateAllowed) {
      return (
        <Button name="falsePositive" class='btn btn-danger' disabled={this.state.falsePositiveBtn} onClick={this.changeFindingStatus}>
          <i class="fa fa-check" aria-hidden="true"></i>
          &nbsp;Mark False Positive
        </Button>
      );
    }
  }
  renderNotExploitableBtn(findingsUpdateAllowed) {
    if (findingsUpdateAllowed) {
      return (
        <Button name="notExploitable" class='btn btn-danger' disabled={this.state.notExploitableBtn} onClick={this.changeFindingStatus}>
          <i class="fa fa-check" aria-hidden="true"></i>
          &nbsp;Mark Not Exploitable
        </Button>
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    var severity = this.props.severity;
    if (nextProps.severity != severity) {
      this.fetchData(nextProps.severity);
    }
    if (nextProps.fetchedFindings && nextProps.fetchedFindings.length > 0) {
      var selectedFindings = {}
      nextProps
        .fetchedFindings
        .map(function(finding, index) {
          selectedFindings[finding.id] = false;
        });
      this.setState({selectedFindings: selectedFindings})
    }
    if (nextProps.updateResponse) {
      this.fetchData(severity);
      toastr.success('Selected findings status updated successfully');
    }
  }
  render() {
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
    const {fetchedFindings} = this.props;
    const {totalSize} = this.props;
    const {updateAllowed} = this.props;
    return (
      <div class="row">
        <div class="col-xs-3">
          {this.renderFlasePositiveBtn(updateAllowed)}
        </div>
        <div class="col-xs-3">
          {this.renderNotExploitableBtn(updateAllowed)}
        </div>
        <div class="col-xs-12">
          <BootstrapTable height="auto" data={fetchedFindings} options={options} fetchInfo={{
            dataTotalSize: totalSize
          }} search remote pagination striped hover bordered={false}>
            <TableHeaderColumn dataField="id" dataFormat={this.selectCheckBoxRender}>
              <input type="checkbox" checked={this.state.checkedAll} onChange={this.selectAll} defaultChecked={false}/>
              &nbsp;Select All
            </TableHeaderColumn>
            <TableHeaderColumn dataField="severity" dataSort dataFormat={this.severityDataFormat}>Severity</TableHeaderColumn>
            <TableHeaderColumn dataField="name" isKey dataSort>Bug Type</TableHeaderColumn>
            <TableHeaderColumn dataField="toolName" dataSort>Tool Name</TableHeaderColumn>
            <TableHeaderColumn dataField="id" dataFormat={this.viewFindingDataFormat}>View Finding</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({fetchedFindings: state.findings.fetchedFindings, totalSize: state.findings.totalSize, updateAllowed: state.findings.updateAllowed, updateResponse: state.findings.updateResponse});

export default connect(mapStateToProps)(List);
