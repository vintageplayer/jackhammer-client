import React, {Component} from 'react'
import MenuItem from 'material-ui/MenuItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import axios from 'axios'
import localStorage from 'localStorage'
import * as gitActions from '../../Actions/GitActions'
import {AUTH_BASE_URL} from '../../Config/Constants'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator, SelectValidator,} from 'react-material-ui-form-validator'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle} from '../CSSModules'
import {axiosInstance} from '../../Config/AxiosInstance'
import {toastr} from 'react-redux-toastr'

const requiredValidation = () => ['required'];
const errorMessage = () => ['this field is required'];
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gitDetailsPresent: false
    };
    this.handleGitTypeChange = this
      .handleGitTypeChange
      .bind(this);
    this.handleUserNameChange = this
      .handleUserNameChange
      .bind(this);
    this.handleGitEndPointChange = this
      .handleGitEndPointChange
      .bind(this);
    this.handleGitApiTokenChange = this
      .handleGitApiTokenChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }
  handleGitTypeChange = (event, gitType) => this.setState({gitType});
  handleUserNameChange = (event, userName) => this.setState({userName});
  handleOrganizationChange = (event, organizationName) => this.setState({organizationName})
  handleGitEndPointChange = (event, gitEndPoint) => this.setState({gitEndPoint});
  handleGitApiTokenChange = (event, apiToken) => this.setState({apiToken});
  componentDidMount() {
    axios.get(AUTH_BASE_URL + "git/1", {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      var gitDetails = response.data;
      if (gitDetails) {
        if (gitDetails.gitType === "Github") {
          var gitType = 0;
        } else if (gitDetails.gitType === "Gitlab") {
          var gitType = 1;
        }
        this.setState({
          gitType: gitType,
          userName: gitDetails.userName,
          gitEndPoint: gitDetails.gitEndPoint,
          apiToken: gitDetails.apiAccessToken,
          organizationName: gitDetails.organizationName,
          gitDetailsPresent: true,
        })
      }
    }).catch((err) => {
      toastr.error("Error while fetching git details");
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    var gitType = this.state.gitType == 0
      ? "Github"
      : "Gitlab"
    var payload = {
      gitType: gitType,
      userName: this.state.userName,
      gitEndPoint: this.state.gitEndPoint,
      apiAccessToken: this.state.apiToken,
    }
    if (gitType === 'Github') {
      payload['organizationName'] = this.state.organizationName
    }
    if (this.state.gitDetailsPresent) {
      this
        .props
        .actions
        .update(1, payload);
    } else {
      this
        .props
        .actions
        .create(payload);
    }
  }
  renderGithubOrganization() {
    if (this.state.gitType === 0) {
      return (<TextValidator name="organizationName" validators={requiredValidation()} errorMessages={errorMessage()} value={this.state.organizationName} floatingLabelText="Organization Name" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleOrganizationChange}/>);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.createResponse) {
      toastr.success("Git details created successfully");
    }
    if (nextProps.updateResponse) {
      toastr.success("Git details updated successfully");
    }
    if (nextProps.error) {
      toastr.error(nextProps.error.data.message);
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <ValidatorForm onSubmit={this.handleSubmit}>

          <SelectValidator fullWidth={true} value={this.state.gitType} name="gitType" validators={requiredValidation()} errorMessages={errorMessage()} floatingLabelText="Git Type" onChange={this.handleGitTypeChange} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}>
            <MenuItem value={0} key="Github" primaryText="Github"/>
            <MenuItem value={1} key="Gitlab" primaryText="Gitlab"/>
          </SelectValidator>
          {this.renderGithubOrganization()}
          <TextValidator name="userName" validators={requiredValidation()} errorMessages={errorMessage()} value={this.state.userName} floatingLabelText="User Name" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleUserNameChange}/>

          <TextValidator validators={requiredValidation()} errorMessages={errorMessage()} value={this.state.gitEndPoint} name="gitEndPoint" floatingLabelText="Git End Point" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleGitEndPointChange}/>

          <TextValidator type="password" validators={requiredValidation()} errorMessages={errorMessage()} value={this.state.apiToken} name="apiToken" floatingLabelText="Api Token" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleGitApiTokenChange}/>

          <button class="btn btn-primary form-page-btn" type="submit">
            Save Details
          </button>
        </ValidatorForm>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = (state) => ({gitDetails: state.git.gitDetails, createResponse: state.git.createResponse, updateResponse: state.git.updateResponse, error: state.git.error,});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(gitActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Form)
