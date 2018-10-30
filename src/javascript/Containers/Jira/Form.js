import React, {Component} from 'react'
import axios from 'axios'
import localStorage from 'localStorage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as jiraActions from '../../Actions/JiraActions'
import {AUTH_BASE_URL} from '../../Config/Constants'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator} from 'react-material-ui-form-validator'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle} from '../CSSModules'
import {axiosInstance} from '../../Config/AxiosInstance'
import {toastr} from 'react-redux-toastr'

const requiredValidation = () => ['required'];
const errorMessage = () => ['this field is required'];
class JiraForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jiraDetailsPresent: false
    };
    this.handleHostChange = this
      .handleHostChange
      .bind(this);
    this.handleUserNameChange = this
      .handleUserNameChange
      .bind(this);
    this.handlePasswordChange = this
      .handlePasswordChange
      .bind(this);
    this.handleDefaultProjectChange = this
      .handleDefaultProjectChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }
  handleHostChange = (event, host) => this.setState({host});
  handleUserNameChange = (event, userName) => this.setState({userName});
  handlePasswordChange = (event, password) => this.setState({password});
  handleDefaultProjectChange = (event, defaultProject) => this.setState({defaultProject});

  componentDidMount() {
    axios.get(AUTH_BASE_URL + "jira/1", {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      var jiraDetails = response.data;
      if (jiraDetails) {
        this.setState({
          host: jiraDetails.host,
          userName: jiraDetails.userName,
          password: jiraDetails.gitEndPoint,
          defaultProject: jiraDetails.defaultProject,
          jiraDetailsPresent: true,
        })
      }
    }).catch((err) => {
      toastr.error("Error while fetching jira details");
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    var payload = {
      host: this.state.host,
      userName: this.state.userName,
      password: this.state.password,
      defaultProject: this.state.defaultProject
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.createResponse) {
      toastr.success("Jira details created successfully");
    }
    if (nextProps.updateResponse) {
      toastr.success("Jira details updated successfully");
    }
    if (nextProps.error) {
      toastr.error(nextProps.error.data.message);
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <ValidatorForm onSubmit={this.handleSubmit}>

          <TextValidator name="host" validators={requiredValidation()} errorMessages={errorMessage()} value={this.state.host} floatingLabelText="Host" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleHostChange}/>

          <TextValidator name="userName" validators={requiredValidation()} errorMessages={errorMessage()} value={this.state.userName} floatingLabelText="User Name" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleUserNameChange}/>

          <TextValidator type="password" name="password" validators={requiredValidation()} errorMessages={errorMessage()} value={this.state.password} floatingLabelText="password" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handlePasswordChange}/>

          <TextValidator name="defaultProject" validators={requiredValidation()} errorMessages={errorMessage()} value={this.state.defaultProject} floatingLabelText="Default Project" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleDefaultProjectChange}/>

          <button class="btn btn-primary form-page-btn" type="submit">
            Save Details
          </button>
        </ValidatorForm>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = (state) => ({jiraDetails: state.jira.jiraDetails, createResponse: state.jira.createResponse, updateResponse: state.git.updateResponse, error: state.jira.error});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(jiraActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(JiraForm)
