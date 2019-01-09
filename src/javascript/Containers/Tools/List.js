import React, {Component} from 'react'
import * as toolActions from '../../Actions/ToolActions'
import {BootstrapTable} from 'react-bootstrap-table'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {renderToAddPage, formatDate, editFormatter, createCustomToolBar} from '../Common'
import {Link} from 'react-router-dom'
import {toastr} from 'react-redux-toastr'

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
      dataRefreshed: false,
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
    this.deleteSelectedTool = this
      .deleteSelectedTool
      .bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
  }
  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(() => {
      this.fetchData();
    }, 30000);
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
      .fetchAllTools(payload)
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

  deleteSelectedTool(event, toolId) {
    event.preventDefault();
    var state = Object.assign(this.state, {toolId: toolId});
    this
      .props
      .actions
      .deleteTool(this.state.toolId)
    this.fetchData();
  }
  handlePageChange(page, sizePerPage) {
    this.fetchData(page, sizePerPage);
  }
  statusFormatter(cell, row) {
    if (cell && cell.includes('Deploying')) {
      return (
        <div class="progress">
          <div class="progress-bar progress-bar-striped progress-bar-animated progress-bar-green" role="progressbar" style={{
            width: '100%'
          }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
            {cell}
          </div>
        </div>
      );
    }
    if (cell && cell.includes('UnHealthy')) {
      return (
        <div class="progress">
          <div class="progress-bar progress-bar-danger" role="progressbar" style={{
            width: '100%'
          }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
            {cell}
          </div>
        </div>
      );
    }
    return (
      <div class="progress">
        <div class="progress-bar progress-bar-success" role="progressbar" style={{
          width: '100%'
        }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
          {cell}
        </div>
      </div>
    );
  }
  handleSizePerPageChange(sizePerPage) {
    // When changing the size per page always navigating to the first page
    this.fetchData(1, sizePerPage);
  }
  deleteFormatter(cell, row) {
    return (
      <a class="btn btn-danger" aria-label="Delete" onClick={this
        .deleteSelectedTool
        .bind(this, event, cell)}>
        <i class="fa fa-trash-o" aria-hidden="true"></i >
      </a>
    );
  }
  // statusFormatter(cell, row) {
  //   return (
  //     <lable class="text-ssucess" aria-label="Delete">
  //       {cell}
  //     </lable>
  //   );
  // }
  handleSearchChange = (searchText, colInfos, multiColumnSearch) => {
    if (searchText.length >= 3 || searchText.length == 0) {
      this.fetchData(1, this.state.sizePerPage, 0, searchText, this.state.orderBy, this.state.sortDirection);
    }
  }
  handleSortChange = (sortName, sortOrder) => {
    this.fetchData(1, this.state.sizePerPage, 0, this.state.searchTerm, sortName, sortOrder);
  }
  renderEditOption(updateAllowed) {
    if (updateAllowed) {
      return (
        <TableHeaderColumn dataField='id' dataFormat={(cell, row) => editFormatter("/edit_tool/" + cell)}>Edit</TableHeaderColumn>
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
      toastr.success('Tool deleted successfully');
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
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
    const {fetchedTools} = this.props;
    const {totalSize} = this.props;
    const {updateAllowed} = this.props;
    const {deleteAllowed} = this.props;
    const {createAllowed} = this.props;
    if (createAllowed)
      options['toolBar'] = (props) => createCustomToolBar(props, this.context, true, "/add_tool", "Add Tool");
    return (
      <BootstrapTable height="auto" data={fetchedTools} options={options} fetchInfo={{
        dataTotalSize: totalSize
      }} search remote pagination striped hover bordered={false}>
        <TableHeaderColumn dataField="name" isKey dataSort>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="createdAt" dataFormat={(cell, row) => formatDate(cell, row)} dataSort>Created</TableHeaderColumn>
        <TableHeaderColumn dataField="updatedAt" dataFormat={(cell, row) => formatDate(cell, row)} dataSort>Updated</TableHeaderColumn>
        <TableHeaderColumn dataField='status' dataFormat={(cell, row) => this.statusFormatter(cell)}>status</TableHeaderColumn>
        {this.renderEditOption(updateAllowed)}
        {this.renderDeleteOption(deleteAllowed)}
      </BootstrapTable>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(toolActions, dispatch)
});
const mapStateToProps = (state) => ({
  fetchedTools: state.tools.fetchedTools,
  totalSize: state.tools.totalSize,
  deleteResponse: state.tools.deleteResponse,
  deleteAllowed: state.tools.deleteAllowed,
  updateAllowed: state.tools.updateAllowed,
  createAllowed: state.tools.createAllowed
});
export default connect(mapStateToProps, mapDispatchToProps)(List);;
