import React, {Component} from 'react'
import axios from 'axios'
import localStorage from 'localStorage'
import fileSaver from 'file-saver'
import {BootstrapTable} from 'react-bootstrap-table'
import {fetchAllFindings} from '../../Actions/FindingActions'
import {renderToAddPage, formatDate, editFormatter, createCustomToolBar} from '../Common'
import {severityBadgeStyle} from '../CSSModules'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {customToolBarStyles} from '../CSSModules'
import {AUTH_BASE_URL} from '../../Config/Constants'

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
      searchTerm: null
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
      .bind(this);
    this.exportCSV = this
      .exportCSV
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
      .push("/finding_detail/" + row.scanId + "/" + row.id + '?sourcePage=scans', {state: 'state'});
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData(page = this.state.page, sizePerPage = this.state.sizePerPage, offset = this.state.offset, searchTerm = this.state.searchTerm, orderBy = this.state.orderBy, sortDirection = this.state.sortDirection) {
    offset = (page - 1) * sizePerPage;
    const payload = {
      offset: offset,
      limit: sizePerPage,
      orderBy: orderBy,
      sortDirection: sortDirection,
      searchTerm: searchTerm,
      scanId: parseInt(this.props.scanId)
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
      sortDirection: sortDirection,
      exportCSV: false,
    })
  }
  handlePageChange(page, sizePerPage) {
    this.fetchData(page, sizePerPage);
  }

  handleSizePerPageChange(sizePerPage) {
    // When changing the size per page always navigating to the first page
    this.fetchData(1, sizePerPage);
  }
  handleSearchChange = (searchText, colInfos, multiColumnSearch) => {
    if (searchText.length >= 3 || searchText.length == 0) {
      this.fetchData(1, this.state.sizePerPage, 0, searchText, this.state.orderBy, this.state.sortDirection);
    }
  }
  handleSortChange = (sortName, sortOrder) => {
    this.fetchData(1, this.state.sizePerPage, 0, this.state.searchTerm, sortName, sortOrder);
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
  exportCSV() {
    const payload = {
      offset: this.state.offset,
      limit: this.state.sizePerPage,
      orderBy: this.state.orderBy,
      sortDirection: this.state.sortDirection,
      searchTerm: this.state.searchTerm,
      scanId: parseInt(this.props.scanId),
      responseType: 'arraybuffer',
      exportCSV: true,
    };
    axios.post(AUTH_BASE_URL + "findings/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      var dateTime = Date.now();
      var timestamp = Math.floor(dateTime / 1000);
      var blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fileSaver.saveAs(blob, 'jackhammer_' + timestamp + ".csv");
    }).catch((error) => {
      var decodedString = String
        .fromCharCode
        .apply(null, new Uint8Array(error.response.data));
      var obj = JSON.parse(decodedString);
      var message = obj['message'];
      toastr.error(message.toLowerCase());
    });
  }
  handleExportCSV(props) {
    return (
      <div class="row" style={customToolBarStyles}>
        <div className='col-xs-6'>
          <button class='btn btn-success' onClick={() => this.exportCSV()}>
            Export To CSV
          </button>
        </div>
        <div className='col-xs-4'></div>
        <div className='col-xs-2 pull-right'>
          {props.components.searchPanel}
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteResponse) {
      this.fetchData();
      toastr.success('Group deleted successfully');
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
      onSortChange: this.handleSortChange,
      toolBar: (props) => this.handleExportCSV(props)
    };
    const {fetchedFindings} = this.props;
    const {totalSize} = this.props;
    return (
      <BootstrapTable height="auto" data={fetchedFindings} options={options} fetchInfo={{
        dataTotalSize: totalSize
      }} search remote pagination striped hover bordered={false}>
        <TableHeaderColumn dataField="severity" dataSort dataFormat={this.severityDataFormat}>Severity</TableHeaderColumn>
        <TableHeaderColumn dataField="name" isKey dataSort>Bug Type</TableHeaderColumn>
        <TableHeaderColumn dataField="description" dataSort>Description</TableHeaderColumn>
        <TableHeaderColumn dataField="toolName" dataSort>Tool Name</TableHeaderColumn>
        <TableHeaderColumn dataField="id" dataFormat={this.viewFindingDataFormat}>View Finding</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

const mapStateToProps = (state) => ({fetchedFindings: state.findings.fetchedFindings, totalSize: state.findings.totalSize,});

export default connect(mapStateToProps)(List);
