import React, {Component} from 'react'
import DropzoneComponent from 'react-dropzone-component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MenuItem from 'material-ui/MenuItem'
import * as toolActions from '../../Actions/ToolActions'
import * as languageActions from '../../Actions/LanguageActions'
import * as scanTypeActions from '../../Actions/ScanTypeActions'
import {TextValidator, SelectValidator} from 'react-material-ui-form-validator'
import {ValidatorForm} from 'react-form-validator-core'
import {FormGroup} from 'react-bootstrap'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle} from '../CSSModules'
import {selectionsRenderer, fetchDropdownOptions,} from '../Common'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toastr} from 'react-redux-toastr'
import {Link} from 'react-router-dom'
import '../../../stylesheets/tools.css'

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      selectedLanguage: null,
      selectedScanType: null,
      openUploadModal: false
    }
    this.handleToolChange = this
      .handleToolChange
      .bind(this);
    this.handleScanTypeChange = this
      .handleScanTypeChange
      .bind(this);
    this.handleLanguageChange = this
      .handleLanguageChange
      .bind(this)
    this.onChangeManifest = this
      .onChangeManifest
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  handleToolChange = (event, name) => this.setState({name});

  handleScanTypeChange = (event, index, selectedScanType) => this.setState({selectedScanType});

  handleLanguageChange = (event, index, selectedLanguage) => this.setState({selectedLanguage});

  componentDidMount() {
    this
      .props
      .actions
      .fetchAllLanguages({limit: -1});
    this
      .props
      .actions
      .fetchAllScanTypes({limit: -1})
  }

  onChangeManifest(file) {
    this.setState({file: file});
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('manifestFile', this.state.file);
    formData.append('name', this.state.name);
    formData.append('scanTypeId', this.state.selectedScanType);
    if (this.state.selectedLanguage !== null)
      formData.append('languageId', this.state.selectedLanguage);
    this
      .props
      .actions
      .createTool(formData);
  }

  findSelectedScanType() {
    const {fetchedScanTypes} = this.props;
    return fetchedScanTypes.find((scanType) => scanType.id === this.state.selectedScanType)
  }
  renderToolName() {
    return (<TextValidator name="name" validators={['required']} errorMessages={['this field is required']} value={this.state.name} floatingLabelText="Tool Name" onChange={this.handleToolChange} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>)
  }

  renderScanTypeList(fetchedScanTypes) {
    return (
      <SelectValidator validators={['required']} errorMessages={['this field is required']} floatingLabelText="Scan Type" name="selectedScanType" value={this.state.selectedScanType} fullWidth={true} maxHeight={200} onChange={this.handleScanTypeChange}>
        {fetchedScanTypes.map((scanType) => {
          return (<MenuItem key={scanType.id} value={scanType.id} primaryText={scanType.name}/>)
        })}
      </SelectValidator>
    )
  }

  renderLanguageList(fetchedLanguages, fetchedScanTypes) {
    if (this.state.selectedScanType) {
      var staticScanType = fetchedScanTypes.find((scanType) => scanType.isStatic);
      if (this.state.selectedScanType === staticScanType.id) {
        return (
          <SelectValidator validators={['required']} errorMessages={['this field is required']} floatingLabelText="Language" name="selectedLanguage" value={this.state.selectedLanguage} fullWidth={true} maxHeight={200} onChange={this.handleLanguageChange}>
            {fetchedLanguages.map((language) => {
              return (<MenuItem key={language.id} value={language.id} primaryText={language.name}/>)
            })}
          </SelectValidator>
        )
      }
    }
  }

  renderManifestoUploader() {
    var componentConfig = {
      iconFiletypes: ['.json'],
      showFiletypeIcon: true,
      postUrl: 'no-url'
    };
    var djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "application/json",
      autoProcessQueue: false
    }
    var eventHandlers = {
      addedfile: (file) => this.onChangeManifest(file)
    }

    return (
      <DropzoneComponent config={componentConfig} djsConfig={djsConfig} eventHandlers={eventHandlers}>
        <div className="dz-message">Upload manifest json file</div>
      </DropzoneComponent>
    )
  }
  toolsLink() {
    return (
      <Link to='/tools/'>
        <i class="fa fa-wrench"></i>
        Tools
      </Link>
    )
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.createResponse) {
      this
        .context
        .router
        .history
        .push('/tools', {state: 'state'});
      toastr.success('Tool created successfully');
    }
    if (nextProps.error) {
      toastr.error(nextProps.error.data.message);
    }
  }
  render() {
    const {fetchedLanguages, fetchedScanTypes,} = this.props;
    return (
      <div class="page-wrapper">
        <section class="content-header">
          <h4>
            Tools
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="#">
                <i class="fa fa-home"></i>
                Home
              </a>
            </li>
            <li class="active">
              <a href="#">
                <i class="fa fa-cog"></i>
                Settings
              </a>
            </li>
            <li>
              {this.toolsLink()}
            </li>
            <li class="active">
              <a href="#">Add a Tool</a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="card">
            <h4 class="card-title">Add Tool</h4>
            <div class="card-body">
              <MuiThemeProvider>
                <ValidatorForm onSubmit={this.handleSubmit}>
                  {this.renderToolName()}
                  {this.renderScanTypeList(fetchedScanTypes)}
                  {this.renderLanguageList(fetchedLanguages, fetchedScanTypes)}
                  {this.renderManifestoUploader()}
                  <button class="btn btn-primary form-page-btn" type="submit">
                    Save Details
                  </button>
                </ValidatorForm>
              </MuiThemeProvider>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({fetchedLanguages: state.languages.fetchedLanguages, fetchedScanTypes: state.scanTypes.fetchedScanTypes, createResponse: state.tools.createResponse, error: state.tools.error,});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, toolActions, languageActions, scanTypeActions), dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Create)
