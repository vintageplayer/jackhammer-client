import React, {Component} from 'react'
import * as repoActions from '../../Actions/RepoActions'
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
      currentGroup: null,
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
    this.repoTitleFormatter = this
      .repoTitleFormatter
      .bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
  }
  componentDidMount() {
    const {ownerType, scanType, group,} = this.props;
    this.setState({currentOwnerType: ownerType, currentScanType: scanType, currentGroup: group})
    this.fetchData(ownerType, scanType, group);
    //   setInterval(() => {
    //     this.fetchData(this.props.ownerType)
    //   }, 15000);
  }
  deleteSelectedScan(event, scanId) {
    this
      .props
      .actions
      .deleteScan(scanId);
  }

  fetchData(ownerType, scanType, group, page = this.state.page, sizePerPage = this.state.sizePerPage, offset = this.state.offset, searchTerm = this.state.searchTerm, orderBy = this.state.orderBy, sortDirection = this.state.sortDirection) {
    offset = (page - 1) * sizePerPage;
    const payload = {
      offset: offset,
      limit: sizePerPage,
      orderBy: orderBy,
      sortDirection: sortDirection,
      searchTerm: searchTerm,
      ownerTypeId: ownerType,
      scanTypeId: scanType,
      groupId: group
    }
    this
      .props
      .actions
      .fetchGroupRepos(payload);
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
    this.fetchData(this.props.ownerType, this.props.scanType, this.props.group, page, sizePerPage);
  }

  handleSizePerPageChange(sizePerPage) {
    // When changing the size per page always navigating to the first page
    this.fetchData(this.props.ownerType, this.props.scanType, this.props.group, 1, sizePerPage);
  }

  handleSearchChange = (searchText, colInfos, multiColumnSearch) => {
    if (searchText.length >= 3 || searchText.length == 0) {
      this.fetchData(this.props.ownerType, this.props.scanType, this.props.group, 1, this.state.sizePerPage, 0, searchText, this.state.orderBy, this.state.sortDirection);
    }
  }
  handleSortChange = (sortName, sortOrder) => {
    this.fetchData(this.props.ownerType, this.props.scanType, this.props.group, 1, this.state.sizePerPage, 0, this.state.searchTerm, sortName, sortOrder);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.ownerType != nextProps.ownerType || this.props.scanType != nextProps.scanType) {
      this.setState({currentOwnerType: nextProps.ownerType, currentScanType: nextProps.scanType, currentGroup: nextProps.currentGroup});
      this.fetchData(nextProps.ownerType, nextProps.scanType, nextProps.group);
    }
  }

  repoTitleFormatter(cell, row) {
    var repoLinkParameters = [];
    repoLinkParameters.push(this.props.ownerType);
    repoLinkParameters.push(this.props.scanType);
    repoLinkParameters.push(this.props.group);
    return (
      <Link to={{
        pathname: '/repo_vulnerability_trend/' + repoLinkParameters.join("/"),
        search: '?repoId=' + row.id,
      }}>
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
    const {groupRepos} = this.props;
    const {totalCount} = this.props;
    return (
      <BootstrapTable height="auto" data={groupRepos} options={options} fetchInfo={{
        dataTotalSize: totalCount
      }} search remote pagination striped hover bordered={false}>
        <TableHeaderColumn dataField="name" isKey dataSort dataFormat={this.repoTitleFormatter}>Title</TableHeaderColumn>
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
const mapStateToProps = (state) => ({groupRepos: state.repos.groupRepos, totalCount: state.repos.totalCount});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(repoActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(List);
