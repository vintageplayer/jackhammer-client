import React, {Component} from 'react'
import SelectField from 'material-ui-selectfield'
import DatePicker from 'material-ui/DatePicker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as filterActions from '../../Actions/FilterActions'
import * as groupActions from '../../Actions/GroupActions'
import * as repoActions from '../../Actions/RepoActions'
import * as toolActions from '../../Actions/ToolActions'
import * as tagActions from '../../Actions/TagActions'
import * as findingActions from '../../Actions/FindingActions'
import {Button} from 'react-bootstrap';
import {BootstrapTable} from 'react-bootstrap-table'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle,} from '../CSSModules'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchDropdownOptions, selectionsRenderer,} from '../Common'
import {toastr} from 'react-redux-toastr'
import {severityBadgeStyle} from '../CSSModules'

class FilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScanTypeId: null,
      currentOwnerTypeId: null,
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
    }
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
    this.fetchFilterValues = this
      .fetchFilterValues
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
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
  handleTagChange = (tags, name) => this.setState({tags})
  handleStatusChange = (status, name) => this.setState({status});
  handleRepoChange = (repos, name) => this.setState({repos})
  handleVulChange = (vulnerabilities, name) => this.setState({vulnerabilities});
  handleGroupChange = (groups, name) => this.setState({groups})
  handleSeverityChange = (severity, name) => this.setState({severity});
  handleAgingChange = (aging, name) => this.setState({aging});
  handleToolChange = (tools, name) => this.setState({tools});
  handleFromDateChange = (event, fromDate) => this.setState({fromDate});
  handleToDateChange = (event, toDate) => this.setState({toDate});

  static contextTypes = {
    router: React.PropTypes.object
  }
  renderTags(filterValues) {
    if (filterValues === null)
      return null;
    return (
      <SelectField name='tags' hintText='' value={this.state.tags} floatingLabel='Tag' onChange={this.handleTagChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} multiple={true} checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
        {fetchDropdownOptions(filterValues.tags)}
      </SelectField>
    );
  }
  renderStatues() {
    var statues = [
      {
        id: "Open",
        name: "Open"
      }, {
        id: "Closed",
        name: "Closed"
      }, {
        id: "Deferred",
        name: "Deferred"
      }, {
        id: "Fix in progress",
        name: "Fix in progress"
      },
    ];
    return (
      <SelectField name='status' hintText='' value={this.state.status} floatingLabel='Status' onChange={this.handleStatusChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
        {fetchDropdownOptions(statues)}
      </SelectField>
    );
  }
  renderRepos(filterValues) {
    if (filterValues === null)
      return null;
    return (
      <SelectField name='repos' hintText='' value={this.state.repos} floatingLabel='Repo' onChange={this.handleRepoChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} multiple={true} checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
        {fetchDropdownOptions(filterValues.repos)}
      </SelectField>
    );
  }
  renderGroups(filterValues) {
    if (filterValues === null)
      return filterValues;
    return (
      <SelectField name='groups' hintText='' value={this.state.groups} floatingLabel='Group' onChange={this.handleGroupChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} multiple={true} checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
        {fetchDropdownOptions(filterValues.groups)}
      </SelectField>
    );
  }

  renderSeverity() {
    var severities = [
      {
        id: "Critical",
        name: "Critical"
      }, {
        id: "High",
        name: "High"
      }, {
        id: "Medium",
        name: "Medium"
      }, {
        id: "Low",
        name: "Low"
      }, {
        id: "Info",
        name: "Info"
      },
    ];
    return (
      <SelectField name='severity' hintText='' value={this.state.severity} floatingLabel='Severity' onChange={this.handleSeverityChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
        {fetchDropdownOptions(severities)}
      </SelectField>
    );
  }
  renderVulnerabilties(filterValues) {
    if (filterValues === null)
      return filterValues;
    var vulnerableTypes = [];
    filterValues
      .vulnerableTypes
      .map(function(type) {
        vulnerableTypes.push({id: type.name, name: type.name,});
      });
    return (
      <SelectField name='vulnerabilities' hintText='' value={this.state.vulnerabilities} floatingLabel='Vulnerable Type' onChange={this.handleVulChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} multiple={true} checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
        {fetchDropdownOptions(vulnerableTypes)}
      </SelectField>
    );
  }
  renderAging() {
    var aging = [
      {
        id: 7,
        name: '1 month ago',
      }, {
        id: 30,
        name: '1 month ago',
      }, {
        id: 90,
        name: '3 months ago',
      }, {
        id: 180,
        name: '6 months ago',
      }, {
        id: 365,
        name: '1 year ago',
      },
    ];
    return (
      <SelectField name='aging' hintText='' value={this.state.aging} floatingLabel='Aging' onChange={this.handleAgingChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
        {fetchDropdownOptions(aging)}
      </SelectField>
    );
  }
  renderTools(filterValues) {
    if (filterValues === null)
      return filterValues;
    var tools = [];
    filterValues
      .tools
      .map(function(tool) {
        tools.push({id: tool.name, name: tool.name,});
      });
    return (
      <SelectField name='tools' hintText='' value={this.state.tools} floatingLabel='Tool' onChange={this.handleToolChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} multiple={true} checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
        {fetchDropdownOptions(tools)}
      </SelectField>
    );
  }
  selectCheckBoxRender = (cell, row) => {
    return (<input id={cell} type="checkbox" value={false} checked={this.state.selectedFindings[cell]} onChange={this.selectOne}/>);
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
      falsePositiveBtn: needToDisableBtns,
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
  componentDidMount() {
    var {ownerType, scanType,} = this.props;
    if (this.props.severity) {
      var payload = {
        limit: 10,
        ownerTypeId: ownerType,
        orderBy: 'name',
        sortDirection: 'asc',
        severity: this.props.severity
      };
      this
        .props
        .actions
        .fetchAllFilterResults(payload);
      this.setState({
        severity: {
          label: this.props.severity,
          value: this.props.severity
        }
      })
    }
    if (this.props.vulnerableType) {
      var payload = {
        limit: 10,
        ownerTypeId: ownerType,
        orderBy: 'name',
        sortDirection: 'asc',
        vulnerabilities: [this.props.vulnerableType]
      };
      this
        .props
        .actions
        .fetchAllFilterResults(payload);
      this.setState({
        vulnerabilities: [
          {
            label: this.props.vulnerableType,
            value: this.props.vulnerableType
          }
        ]
      })
    }
    this.fetchFilterValues(ownerType, scanType);
  }
  fetchFilterValues(ownerType, scanType) {
    this.setState({currentScanTypeId: scanType, currentOwnerTypeId: ownerType})
    var payload = {
      limit: -1,
      ownerTypeId: ownerType,
      scanTypeId: scanType
    };
    this
      .props
      .actions
      .fetchFilterValues(payload);
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
      .actions
      .updateFilterFinding(payload, 0);
  }

  handleSubmit(event) {
    event.preventDefault();
    var payload = {
      limit: 10,
      ownerTypeId: this.state.currentOwnerTypeId,
      scanTypeId: this.state.currentScanTypeId,
      orderBy: 'name',
      sortDirection: 'asc'
    };
    var payloadDetails = this.getPayload(payload);
    payload = payloadDetails[0];
    var anyOneSelected = payloadDetails[1];
    if (anyOneSelected) {
      this
        .props
        .actions
        .fetchAllFilterResults(payload);
    } else {
      toastr.error('Please selecte at least one criteria');
    }
  }
  getPayload(payload) {
    var anyOneSelected = false;
    if (this.state.tags) {
      anyOneSelected = true;
      payload['tagIds'] = this
        .state
        .tags
        .map((tag) => tag.value);
    }
    if (this.state.repos) {
      anyOneSelected = true;
      payload['repoIds'] = this
        .state
        .repos
        .map((repo) => repo.value);
    }
    if (this.state.groups) {
      anyOneSelected = true;
      payload['groupIds'] = this
        .state
        .groups
        .map((group) => group.value);
    }
    if (this.state.tools) {
      anyOneSelected = true;
      payload['toolNames'] = this
        .state
        .tools
        .map((tool) => tool.value);
    }
    if (this.state.vulnerabilities) {
      anyOneSelected = true;
      payload['vulnerabilities'] = this
        .state
        .vulnerabilities
        .map((vulnerability) => vulnerability.value);
    }
    if (this.state.status) {
      anyOneSelected = true;
      payload['status'] = this.state.status.value;
    }
    if (this.state.severity) {
      anyOneSelected = true;
      payload['severity'] = this.state.severity.value;
    }
    if (this.state.aging) {
      anyOneSelected = true;
      payload['aging'] = this.state.aging.value;
    }
    if (this.state.fromDate) {
      anyOneSelected = true;
      payload['fromDate'] = this.state.fromDate;
    }
    if (this.state.toDate) {
      anyOneSelected = true;
      payload['toDate'] = this.state.toDate;
    }
    return [payload, anyOneSelected,]
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
  filterResults(filterResults, options, totalSize, findingsUpdateAllowed) {
    if (filterResults.length === 0)
      return (
        <h4 class='text-center'>
          Filters not applied / No Results
        </h4>
      );
    return (
      <div class="row">
        <div class="col-xs-3">
          {this.renderFlasePositiveBtn(findingsUpdateAllowed)}
        </div>
        <div class="col-xs-3">
          {this.renderNotExploitableBtn(findingsUpdateAllowed)}
        </div>
        <div class='col-xs-12'>
          <BootstrapTable height="auto" data={filterResults} options={options} fetchInfo={{
            dataTotalSize: totalSize
          }} search remote pagination striped hover bordered={false}>
            <TableHeaderColumn dataField="id" dataFormat={this.selectCheckBoxRender}>
              <input type="checkbox" checked={this.state.checkedAll} onChange={this.selectAll}/>
              &nbsp;Select All
            </TableHeaderColumn>
            <TableHeaderColumn dataField="severity" dataSort dataFormat={this.severityDataFormat}>Severity</TableHeaderColumn>
            <TableHeaderColumn dataField="name" isKey dataSort>Bug Type</TableHeaderColumn>
            <TableHeaderColumn dataField="description" dataSort>Description</TableHeaderColumn>
            <TableHeaderColumn dataField="toolName" dataSort>Tool Name</TableHeaderColumn>
            <TableHeaderColumn dataField="id" dataFormat={this.viewFindingDataFormat}>View Finding</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
  fetchData(page = this.state.page, sizePerPage = this.state.sizePerPage, offset = this.state.offset, searchTerm = this.state.searchTerm, orderBy = this.state.orderBy, sortDirection = this.state.sortDirection) {
    offset = (page - 1) * sizePerPage;
    var payload = {
      offset: offset,
      limit: sizePerPage,
      orderBy: orderBy,
      sortDirection: sortDirection,
      searchTerm: searchTerm,
      ownerTypeId: this.state.currentOwnerTypeId,
      scanTypeId: this.state.currentScanTypeId
    }
    var payloadDetails = this.getPayload(payload);
    payload = payloadDetails[0];
    this
      .props
      .actions
      .fetchAllFilterResults(payload);
    this.setState({
      totalSize: this.props.totalSize,
      offset: offset,
      sizePerPage: sizePerPage,
      page: page,
      searchTerm: searchTerm,
      orderBy: orderBy
        ? orderBy
        : "name",
      sortDirection: sortDirection,
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
  viewFinding(event, row) {
    this
      .context
      .router
      .history
      .push("/finding_detail/" + row.scanId + "/" + row.id, {state: 'state'});
  }
  severityDataFormat = (cell, row) => {
    return (
      <span class={'badge ' + cell.toLowerCase() + '-severity'} style={severityBadgeStyle}>
        {cell}
      </span>
    );
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.ownerType != nextProps.ownerType || this.props.scanType != nextProps.scanType) {
      this.fetchFilterValues(nextProps.ownerType, nextProps.scanType)
    }
    if (nextProps.fetchedResults && nextProps.fetchedResults.length > 0) {
      var selectedFindings = {}
      nextProps
        .fetchedResults
        .map(function(finding, index) {
          selectedFindings[finding.id] = false;
        });
      this.setState({selectedFindings: selectedFindings})
    }
    if (nextProps.updateResponse) {
      this.fetchData();
      toastr.success('Selected findings status updated successfully');
    }
  }
  render() {
    const {filterValues} = this.props;
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
    const {fetchedResults} = this.props;
    const {totalSize} = this.props;
    const {findingsUpdateAllowed} = this.props;
    return (
      <section class="content">
        <div class="card">
          <div class="card-body">
            <MuiThemeProvider>
              <form>
                <div class="row">
                  <div class="col-xs-6">
                    {this.renderTags(filterValues)}
                  </div>
                  <div class="col-xs-6">
                    {this.renderStatues()}
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6">
                    {this.renderRepos(filterValues)}
                  </div>
                  <div class="col-xs-6">
                    {this.renderVulnerabilties(filterValues)}
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6">
                    {this.renderGroups(filterValues)}
                  </div>
                  <div class="col-xs-6">
                    {this.renderSeverity()}
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6">
                    {this.renderAging()}
                  </div>
                  <div class="col-xs-6">
                    {this.renderTools(filterValues)}
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6">
                    <DatePicker hintText="From Date" fullWidth={true} style={{
                      paddingTop: 25
                    }} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} value={this.state.fromDate} onChange={this.handleFromDateChange}/>
                  </div>
                  <div class="col-xs-6">
                    <DatePicker hintText="To Date" fullWidth={true} style={{
                      paddingTop: 25
                    }} value={this.state.toDate} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleToDateChange}/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6">
                    <button class="btn btn-primary form-page-btn" onClick={this.handleSubmit}>
                      Apply Filters
                    </button>
                  </div>
                </div>
              </form>
            </MuiThemeProvider>
          </div>
        </div>
        <div class="card">
          <h4 class="card-title">Filter Results</h4>
          <div class="card-body">
            {this.filterResults(fetchedResults, options, totalSize, findingsUpdateAllowed)}
          </div>
        </div>
      </section>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, filterActions, groupActions, repoActions, toolActions, tagActions, findingActions), dispatch)
});
const mapStateToProps = (state) => ({
  filterValues: state.filters.filterValues,
  fetchedResults: state.filters.fetchedResults,
  totalSize: state.filters.totalSize,
  findingsUpdateAllowed: state.filters.findingsUpdateAllowed,
  updateResponse: state.filters.updateFilterFindings,
});
export default connect(mapStateToProps, mapDispatchToProps)(FilterList);
