import React, {Component} from 'react'
import * as applicationActions from '../../Actions/ApplicationActions'
import {BootstrapTable} from 'react-bootstrap-table'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      sizePerPage: 10,
      page: 1,
      totalSize: 0,
      orderBy: "criticalCount",
      sortDirection: 'DESC',
      searchTerm: null,
      currentOwnerType: null,
      currentScanType: null,
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
    this.applicationTitleFormatter = this
      .applicationTitleFormatter
      .bind(this);
  }

  componentDidMount() {
    const {ownerType, scanType} = this.props;
    this.setState({currentOwnerType: ownerType, currentScanType: scanType,})
    this.fetchData(ownerType, scanType);
    //   setInterval(() => {
    //     this.fetchData(this.props.ownerType)
    //   }, 15000);
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
      scanTypeId: scanType,
    }
    this
      .props
      .actions
      .fetch(payload);
    this.setState({
      totalSize: this.props.totalSize,
      offset: offset,
      sizePerPage: sizePerPage,
      page: page,
      searchTerm: searchTerm,
      orderBy: orderBy,
      sortDirection: sortDirection,
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
  componentWillReceiveProps(nextProps) {
    if (this.props.ownerType != nextProps.ownerType || this.props.scanType != nextProps.scanType) {
      this.setState({currentOwnerType: nextProps.ownerType, currentScanType: nextProps.scanType,})
      this.fetchData(nextProps.ownerType, nextProps.scanType);
    }
  }
  applicationTitleFormatter(cell, row) {
    var repoLinkParameters = [];
    repoLinkParameters.push(this.state.currentOwnerType);
    repoLinkParameters.push(this.state.currentScanType);
    repoLinkParameters.push(row.id);
    return (
      <Link to={"/repos/" + repoLinkParameters.join("/")}>
        {row.name}
      </Link>
    );
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
    };
    const {applicationsData} = this.props;
    const {totalCount} = this.props;
    return (
      <BootstrapTable height="auto" data={applicationsData} options={options} fetchInfo={{
        dataTotalSize: totalCount
      }} search remote pagination striped hover bordered={false}>
        <TableHeaderColumn dataField="name" isKey dataSort dataFormat={this.applicationTitleFormatter}>Title</TableHeaderColumn>
        <TableHeaderColumn dataField="totalCount" dataSort>Total Count</TableHeaderColumn>
        <TableHeaderColumn dataField="criticalCount" dataSort>Critical Count</TableHeaderColumn>
        <TableHeaderColumn dataField="highCount" dataSort>High Count</TableHeaderColumn>
        <TableHeaderColumn dataField="mediumCount" dataSort>Medium Count</TableHeaderColumn>
        <TableHeaderColumn dataField="lowCount" dataSort>Low Count</TableHeaderColumn>
        <TableHeaderColumn dataField="infoCount" dataSort>Info Count</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}
const mapStateToProps = (state) => ({applicationsData: state.applications.applicationsData, totalCount: state.applications.totalCount});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(applicationActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(List);
