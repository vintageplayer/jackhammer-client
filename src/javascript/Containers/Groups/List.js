import React, {Component} from 'react'
import {BootstrapTable} from 'react-bootstrap-table'
import {fetchAllGroups, deleteGroup,} from '../../Actions/GroupActions'
import {renderToAddPage, formatDate, editFormatter, createCustomToolBar} from '../Common'
import {connect} from 'react-redux'
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
    this.deleteFormatter = this
      .deleteFormatter
      .bind(this);
    this.deleteSelectedGroup = this
      .deleteSelectedGroup
      .bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
  }
  deleteSelectedGroup(groupId) {
    this
      .props
      .dispatch(deleteGroup(groupId));
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
      searchTerm: searchTerm
    }
    this
      .props
      .dispatch(fetchAllGroups(payload));
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
  deleteSelectedGroup(groupId) {
    this
      .props
      .dispatch(deleteGroup(groupId));
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
        .deleteSelectedGroup
        .bind(this, cell)}>
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

  renderEditOption(updateAllowed) {
    if (updateAllowed) {
      return (
        <TableHeaderColumn dataField='id' dataFormat={(cell, row) => editFormatter("/edit_group/" + cell)}>Edit</TableHeaderColumn>
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteResponse) {
      this.fetchData();
      toastr.success('Group deleted successfully');
    }
  }
  render() {
    const addGroupUrl = "/add_group";
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
    const {fetchedGroups} = this.props;
    const {totalSize} = this.props;
    const {updateAllowed} = this.props;
    const {deleteAllowed} = this.props;
    const {createAllowed} = this.props;
    if (createAllowed)
      options['toolBar'] = (props) => createCustomToolBar(props, this.context, true, addGroupUrl, "Add Group");
    return (
      <BootstrapTable height="auto" data={fetchedGroups} options={options} fetchInfo={{
        dataTotalSize: totalSize
      }} search remote pagination striped hover bordered={false}>
        <TableHeaderColumn dataField="name" isKey dataSort>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="createdAt" dataFormat={(cell, row) => formatDate(cell, row)} dataSort>Created</TableHeaderColumn>
        <TableHeaderColumn dataField="updatedAt" dataFormat={(cell, row) => formatDate(cell, row)} dataSort>Updated</TableHeaderColumn>
        {this.renderEditOption(updateAllowed)}
        {this.renderDeleteOption(deleteAllowed)}
      </BootstrapTable>
    )
  }
}

const mapStateToProps = (state) => ({
  fetchedGroups: state.groups.fetchedGroups,
  deleteResponse: state.groups.deleteResponse,
  deleteAllowed: state.groups.deleteAllowed,
  updateAllowed: state.groups.updateAllowed,
  createAllowed: state.groups.createAllowed,
  totalSize: state.groups.totalSize,
});

export default connect(mapStateToProps)(List);
