import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import * as permissionActions from '../../Actions/PermissionActions'
import {bindActionCreators} from 'redux'
import {renderToAddPage, formatDate, editFormatter, createCustomToolBar,} from '../Common'
import {Link} from 'react-router-dom'
import {toastr} from 'react-redux-toastr'
import {connect} from 'react-redux'

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      permissionId: null,
      offset: 0,
      sizePerPage: 10,
      page: 1,
      totalSize: 0,
      orderBy: "name",
      sortDirection: 'ASC',
      searchTerm: null,
      dataRefreshed: false
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
    this.deleteSelectedPermission = this
      .deleteSelectedPermission
      .bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
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
    }
    this
      .props
      .actions
      .fetchAllPermissions(payload)
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

  deleteSelectedPermission(event, permissionId) {
    event.preventDefault();
    var state = Object.assign(this.state, {permissionId: permissionId});
    this
      .props
      .actions
      .deletePermission(this.state.permissionId)
    this.fetchData();
  }
  handlePageChange(page, sizePerPage) {
    this.fetchData(page, sizePerPage);
  }

  handleSizePerPageChange(sizePerPage) {
    // When changing the size per page always navigating to the first page
    this.fetchData(1, sizePerPage);
  }
  deleteFormatter(cell, row) {
    return (
      <a class="btn btn-danger" aria-label="Delete" onClick={this
        .deleteSelectedPermission
        .bind(this, event, cell)}>
        <i class="fa fa-trash-o" aria-hidden="true"></i >
      </a>
    );
  }
  handleSearchChange = (searchText, colInfos, multiColumnSearch) => {
    if (searchText.length >= 3 || searchText.length == 0) {
      this.fetchData(1, this.state.sizePerPage, searchText, this.state.orderBy, this.state.sortDirection);
    }
  }
  handleSortChange = (sortName, sortOrder) => {
    this.fetchData(1, this.state.sizePerPage, 0, this.state.searchTerm, sortName, sortOrder);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteResponse) {
      this.fetchData();
      toastr.success('Permission deleted successfully');
    }
  }
  render() {
    const options = {
      onPageChange: this.handlePageChange,
      onSizePerPageList: this.handleSizePerPageChange,
      page: this.state.page,
      sizePerPage: this.state.sizePerPage,
      toolBar: (props) => createCustomToolBar(props, this.context, true, "/add_permission", "Add Permission"),
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text,,,,
      onSearchChange: this.handleSearchChange,
      onSortChange: this.handleSortChange
    };
    const {fetchedPermissions} = this.props;
    const {totalSize} = this.props;
    return (
      <BootstrapTable height="auto" data={fetchedPermissions} options={options} fetchInfo={{
        dataTotalSize: totalSize
      }} search remote pagination striped hover bordered={false}>
        <TableHeaderColumn dataField="name" isKey dataSort>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="createdAt" dataFormat={(cell, row) => formatDate(cell, row)} dataSort>Created</TableHeaderColumn>
        <TableHeaderColumn dataField="updatedAt" dataFormat={(cell, row) => formatDate(cell, row)} dataSort>Updated</TableHeaderColumn>
        <TableHeaderColumn dataField='id' dataFormat={(cell, row) => editFormatter("/edit_permission/" + cell)}>Edit</TableHeaderColumn>
        <TableHeaderColumn dataField='id' dataFormat={this.deleteFormatter}>Delete</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(permissionActions, dispatch)
});
const mapStateToProps = (state) => ({fetchedPermissions: state.permissions.fetchedPermissions, totalSize: state.permissions.totalSize, deleteResponse: state.permissions.deleteResponse});
export default connect(mapStateToProps, mapDispatchToProps)(List);
