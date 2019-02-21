import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui-selectfield'
import DropzoneComponent from 'react-dropzone-component'
import validUrl from 'valid-url'
import validateip from 'validate-ip'
import * as groupActions from '../../Actions/GroupActions'
import * as scheduleTypeActions from '../../Actions/ScheduleTypeActions'
import * as repoActions from '../../Actions/RepoActions'
import * as scanActions from '../../Actions/ScanActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormGroup, Button} from 'react-bootstrap'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle,} from '../CSSModules'
import {fetchDropdownOptions, selectionsRenderer,} from '../Common'
import {toastr} from 'react-redux-toastr'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator} from 'react-material-ui-form-validator'
import {Link} from 'react-router-dom'
import 'react-dropzone-component/styles/filepicker.css'
import 'dropzone/dist/min/dropzone.min.css'

import {
  CORPORATE,
  TEAM,
  PERSONAL,
  SOURCE_CODE,
  WEB,
  MOBILE,
  WORDPRESS,
  NETWORK,
  HARDCODED_SECRET,
} from '../../Config/Constants'

const groupFieldRequired = (ownerType, scanType) => ownerType && scanType && (ownerType.name === CORPORATE || ownerType.name === TEAM);

const multiGroupSelectionRequired = (ownerType, scanType) => groupFieldRequired(ownerType, scanType) && (scanType.name === SOURCE_CODE || scanType.name === HARDCODED_SECRET);

const singleGroupSelectionRequired = (ownerType, scanType) => groupFieldRequired(ownerType, scanType) && (scanType.name !== SOURCE_CODE || scanType.name !== HARDCODED_SECRET);

const repoFieldRequired = (ownerType, scanType) => ownerType && scanType && (ownerType.name === CORPORATE || ownerType.name === TEAM) && (scanType && (scanType.name === SOURCE_CODE || scanType.name === HARDCODED_SECRET));

const projectTitleFieldRequired = (ownerType, scanType) => ownerType && scanType && (ownerType.name === PERSONAL || scanType.name !== SOURCE_CODE);
const hardcodeSecretProjectTitleFieldRequired = (ownerType, scanType) => ownerType && scanType && (ownerType.name === PERSONAL || scanType.name !== HARDCODED_SECRET);
const fielUploadRequired = (scanType) => scanType && scanType.name === MOBILE

const targetFieldRequired = (ownerType, scanType) => ownerType && scanType && (((scanType.name === SOURCE_CODE || scanType.name === HARDCODED_SECRET) && ownerType.name === PERSONAL) || scanType.name === WEB || scanType.name === NETWORK || scanType.name === WORDPRESS);

const branchFieldRequired = (ownerType, scanType) => scanType && ownerType && (ownerType.name === PERSONAL) && (scanType.name === SOURCE_CODE || scanType.name === HARDCODED_SECRET);

class TargetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectTitle: '',
      target: '',
      branch: null,
      selectedGroups: null,
      selectedRepos: null,
      selectedSchedule: null,
      apkFile: null,
      status: 'Pending',
      repoFiedlRequired: false,
    };
    this.handleGroupChange = this
      .handleGroupChange
      .bind(this);
    this.handleScanNow = this
      .handleScanNow
      .bind(this);
    this.handleAddTarget = this
      .handleAddTarget
      .bind(this);
    this.handleApkUpload = this
      .handleApkUpload
      .bind(this);
    this.submitRequest = this
      .submitRequest
      .bind(this);
    this.handleRepoChange = this
      .handleRepoChange
      .bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  selectAll = () => {
    if (this.state.checkedAll)
      this.setState({values: []});
    else
      this.setState({values: names});
    this.setState({
      checkedAll: !this.state.checkedAll
    });
  }

  componentDidMount() {
    var ownerTypeId = this.props.match.params.ownerType;
    var scanTypeId = this.props.match.params.scanType;
    this
      .props
      .actions
      .fetchAllGroups({limit: -1, ownerTypeId: ownerTypeId, scanTypeId: scanTypeId});
    this
      .props
      .actions
      .fetchAllScheduleTypes({ownerTypeId: ownerTypeId, scanTypeId: scanTypeId,});
  }
  handleProjectTitleChange = (event, projectTitle) => this.setState({projectTitle});
  handleTargetChange = (event, target) => this.setState({target});
  handleBranchChange = (event, branch) => this.setState({branch});
  handleGroupChange(selectedGroups, name) {
    const {currentOwnerType, currentScanType} = this.props;
    this.setState({selectedGroups});
    var selectedGroupIds = [];
    if (Array.isArray(selectedGroups)) {
      var selectAllPresent = selectedGroups.find((group) => group.value == "Select All");
      if (selectAllPresent) {
        this
          .props
          .fetchedGroups
          .forEach(function(group) {
            if (group.id !== "Select All") {
              selectedGroupIds.push(group.id);
            }
          })
      } else {
        selectedGroups.map((group) => (selectedGroupIds.push(group.value)));
      }
    } else {
      selectedGroupIds.push(selectedGroups['value'])
    }
    this.setState({selectedGroupIds: selectedGroupIds});
    if (repoFieldRequired(currentOwnerType, currentScanType)) {
      this
        .props
        .actions
        .fetchGroupRepos({groupIds: selectedGroupIds});
    }
  }
  handleRepoChange(selectedRepos, name) {
    var selectedRepoIds = [];
    if (Array.isArray(selectedRepos)) {
      var selectAllPresent = selectedRepos.find((repo) => repo.value == "Select All");
      if (selectAllPresent) {
        this
          .props
          .groupRepos
          .forEach(function(repo) {
            if (repo.id !== "Select All") {
              selectedRepoIds.push(repo.id);
            }
          })
      } else {
        selectedRepos.map((repo) => (selectedRepoIds.push(repo.value)));
      }
    } else {
      selectedRepoIds.push(selectedRepos['value'])
    }
    this.setState({selectedRepos});
    this.setState({selectedRepoIds: selectedRepoIds})
  }
  handleScheduleChange = (selectedSchedule, name) => this.setState({selectedSchedule});

  handleApkUpload(file) {
    this.setState({apkFile: file})
  }
  renderProjectTitle(ownerType, scanType, projectTitle) {
    if (projectTitleFieldRequired(ownerType, scanType) && hardcodeSecretProjectTitleFieldRequired(ownerType, scanType)) {
      return (<TextValidator name="projectTitle" value={this.state.projectTitle} validators={['required']} errorMessages={['this field is required']} floatingLabelText="Project Title" onChange={this.handleProjectTitleChange} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>);
    }
  }

  renderTarget(ownerType, scanType, target) {
    if (targetFieldRequired(ownerType, scanType)) {
      return (<TextValidator name="target" value={this.state.target} validators={['isValidUrl', 'required',]} errorMessages={['Invalid Target', 'this field is required',]} floatingLabelText="Target" onChange={this.handleTargetChange} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>);
    }
  }
  renderApkFileUpalodInput(scanType) {
    if (fielUploadRequired(scanType)) {
      var componentConfig = {
        iconFiletypes: ['.apk'],
        showFiletypeIcon: true,
        postUrl: 'no-url',
      };
      var djsConfig = {
        addRemoveLinks: true,
        acceptedFiles: "application/vnd.android.package-archive",
        autoProcessQueue: false,
      }
      var eventHandlers = {
        addedfile: (file) => this.handleApkUpload(file)
      }
      return (
        <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig}>
          <div className="dz-message">Upload Apk file</div>
        </DropzoneComponent>
      );
    }
  }
  getSelectedGroup(group) {
    return (
      <div key={group.id} value={group.id} label={group.name}>
        {group.name}
      </div>
    );
  }
  renderGroupSelect(ownerType, scanType, selectedGroups, fetchedGroups) {
    var isMultiSelect = multiGroupSelectionRequired(ownerType, scanType);
    var isSingleSelect = singleGroupSelectionRequired(ownerType, scanType);
    if (isSingleSelect && fetchedGroups) {
      var SelectedGroup = fetchedGroups.find((group) => group.isDefault);
    }
    if (groupFieldRequired(ownerType, scanType)) {
      var groupList = fetchedGroups;
      var selectAllFound = fetchedGroups.find((group) => group.name == 'Select All');
      if (selectAllFound == null)
        groupList.unshift({id: 'Select All', name: 'Select All',});
      return (
        <SelectField name='selectedGroups' hintText='' value={selectedGroups} floatingLabel='Group' onChange={this.handleGroupChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} multiple={isMultiSelect} checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
          {fetchDropdownOptions(groupList)}
        </SelectField>
      );
    }
  }

  renderRepoSelect(ownerType, scanType, selectedRepos, groupRepos) {
    var reposRequired = repoFieldRequired(ownerType, scanType);
    if (reposRequired) {
      var repoList = groupRepos;
      var selectAllFound = groupRepos.find((repo) => repo.name == 'Select All');
      if (selectAllFound == null)
        repoList.unshift({id: 'Select All', name: 'Select All',})
      return (
        <SelectField name='selectedRepos' hintText='' value={selectedRepos} floatingLabel='Repo' onChange={this.handleRepoChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} multiple checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
          {fetchDropdownOptions(repoList)}
        </SelectField>
      )
    }
  }

  renderBranch(ownerType, scanType, branch) {
    if (branchFieldRequired(ownerType, scanType)) {
      return (<TextField name="branch" floatingLabelText="Branch" onChange={this.handleBranchChange} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>);
    }
  }

  renderScheduleSelect(selectedSchedule, fetchedScheduleTypes, scanType) {
    if (scanType && scanType.name !== MOBILE)
      return (
        <SelectField name='selectedSchedule' hintText='' floatingLabel='Schedule' value={selectedSchedule} onChange={this.handleScheduleChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
          {fetchDropdownOptions(fetchedScheduleTypes)}
        </SelectField>
      )
  }

  handleScanNow() {
    this.submitRequest("Queued");
  }

  handleAddTarget() {
    this.submitRequest("Pending");
  }
  submitRequest(status) {
    const {currentOwnerType, currentScanType} = this.props;
    var selectedGroupIds = [];
    if (this.state.selectedGroupIds !== undefined)
      selectedGroupIds = this.state.selectedGroupIds;

    // if (Array.isArray(this.state.selectedGroups)) {
    //   this
    //     .state
    //     .selectedGroups
    //     .map((group) => (selectedGroupIds.push(group.value)));
    // } else if (this.state.selectedGroups) {
    //   selectedGroupIds.push(this.state.selectedGroups.value)
    // }
    var selectedRepoIds = [];
    if (this.state.selectedRepoIds !== undefined)
      selectedRepoIds = this.state.selectedRepoIds;

    // if (Array.isArray(this.state.selectedRepos)) {
    //   this
    //     .state
    //     .selectedRepos
    //     .map((repo) => (selectedRepoIds.push(repo.value)));
    // } else if (this.state.selectedRepos) {
    //   selectedRepoIds.push(this.state.selectedRepos.value);
    // }

    var selectedSchedule = this.state.selectedSchedule
      ? this.state.selectedSchedule.value
      : null;
    if (currentScanType.name === MOBILE) {
      var formData = new FormData();
      formData.append('name', this.state.projectTitle);
      formData.append('target', this.state.target);
      formData.append('branch', this.state.branch);
      formData.append('apkFile', this.state.apkFile);
      formData.append('scanTypeId', this.props.match.params.scanType);
      formData.append('ownerTypeId', this.props.match.params.ownerType);
      formData.append('status', status);
      if (selectedGroupIds.length > 0)
        formData.append('groupIds', selectedGroupIds);
      if (selectedRepoIds.length > 0)
        formData.append('repoIds', selectedRepoIds);
      this
        .props
        .actions
        .createMobileScan(formData);
    } else {
      var payload = {
        name: this.state.projectTitle,
        target: this.state.target,
        branch: this.state.branch,
        scanTypeId: this.props.match.params.scanType,
        ownerTypeId: this.props.match.params.ownerType,
        groupIds: selectedGroupIds,
        repoIds: selectedRepoIds,
        scheduleTypeId: selectedSchedule,
        status: status,
      };
      this
        .props
        .actions
        .createScan(payload);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.createResponse) {
      var {ownerType, scanType} = this.props.match.params;
      var redirectUrl = '/scans/' + ownerType + "/" + scanType;
      this
        .context
        .router
        .history
        .push(redirectUrl, {state: 'state'});
      toastr.success('Scan created successfully');
    }
    if (nextProps.fetchedGroups && !nextProps.createResponse) {
      var SelectedGroup = nextProps
        .fetchedGroups
        .find((group) => group.isDefault);
      if (SelectedGroup) {
        this.setState({
          selectedGroups: {
            value: SelectedGroup.id,
            label: SelectedGroup.name,
          },
          selectedGroupIds: [SelectedGroup.id],
        });
      }
    }
    if (nextProps.currentScanType && nextProps.currentScanType.name === NETWORK) {
      ValidatorForm.addValidationRule('isValidUrl', (value) => {
        var validTarget = false;
        if (validUrl.isUri(this.state.target)) {
          validTarget = true;
        } else if (validateip(this.state.target)) {
          validTarget = true;
        } else if (this.state.target === "localhost") {
          validTarget = true;
        } else {
          validTarget = false;
        }
        return validTarget;
      });
    } else {
      ValidatorForm.addValidationRule('isValidUrl', (value) => {
        if (validUrl.isUri(this.state.target)) {
          return true;
        }
        return false;
      });
    }
  }
  renderBreadCrumbLabels(ownerType, scanType, breadcrumbType) {
    if (ownerType === null || scanType === null)
      return null;
    if (breadcrumbType === "owner") {
      return (
        <Link to={"/scans/" + ownerType.id + "/" + scanType.id}>
          {ownerType.name}
        </Link>
      )
    } else {
      return (
        <Link to={"/scans/" + ownerType.id + "/" + scanType.id}>
          {scanType.name}
        </Link>
      )
    }
  }
  render() {
    const {
      projectTitle,
      target,
      branch,
      selectedGroups,
      selectedRepos,
      selectedSchedule,
    } = this.state;
    const {
      fetchedGroups,
      fetchedScheduleTypes,
      groupRepos,
      currentScanType,
      currentOwnerType,
    } = this.props;
    return (
      <div class="page-wrapper">
        <section class="content-header">
          <h4>
            Scans
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="#">
                <i class="fa fa-dashboard"></i>
                Home
              </a>
            </li>
            <li class="active">
              <a href="#">Scans</a>
            </li>
            <li class="active">
              {this.renderBreadCrumbLabels(currentOwnerType, currentScanType, "owner")}
            </li>
            <li class="active">
              {this.renderBreadCrumbLabels(currentOwnerType, currentScanType, "scanType")}
            </li>
            <li class="active">
              <a href="#">Create Scan</a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="card">
            <h4 class="card-title">Add Scan</h4>
            <div class="card-body">
              <MuiThemeProvider>
                <ValidatorForm onSubmit={this.handleScanNow}>
                  {this.renderGroupSelect(currentOwnerType, currentScanType, selectedGroups, fetchedGroups)}
                  {this.renderRepoSelect(currentOwnerType, currentScanType, selectedRepos, groupRepos)}
                  {this.renderProjectTitle(currentOwnerType, currentScanType, projectTitle)}
                  {this.renderTarget(currentOwnerType, currentScanType, target)}
                  {this.renderApkFileUpalodInput(currentScanType)}
                  {this.renderBranch(currentOwnerType, currentScanType, branch)}
                  {this.renderScheduleSelect(selectedSchedule, fetchedScheduleTypes, currentScanType)}
                  <div class='row'>
                    <div class='col-md-6'>
                      <button class="btn btn-primary form-page-btn" type="submit">
                        Scan Now
                      </button>
                    </div>
                  </div>
                </ValidatorForm>
              </MuiThemeProvider>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, groupActions, repoActions, scheduleTypeActions, scanActions), dispatch)
});
const mapStateToProps = (state) => ({
  fetchedGroups: state.groups.fetchedGroups,
  groupRepos: state.repos.groupRepos,
  fetchedScheduleTypes: state.scheduleTypes.fetchedScheduleTypes,
  currentOwnerType: state.scheduleTypes.ownerType,
  currentScanType: state.scheduleTypes.scanType,
  createResponse: state.scans.createResponse,
  error: state.scans.error
});
export default connect(mapStateToProps, mapDispatchToProps)(TargetForm);;
