import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui/SelectField'
import axios from 'axios'
import localStorage from 'localStorage'
import * as smtpActions from '../../Actions/SMTPActions'
import {AUTH_BASE_URL} from '../../Config/Constants'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle} from '../CSSModules'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {axiosInstance} from '../../Config/AxiosInstance'
import {toastr} from 'react-redux-toastr'
import {ButtonInput} from 'react-bootstrap'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator} from 'react-material-ui-form-validator'

const requiredValidation = () => ['required'];
const errorMessage = () => ['this field is required'];

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smtpDetailsPresent: false
    };
    this.handleApplicationUrlChange = this
      .handleApplicationUrlChange
      .bind(this);
    this.handleSMTPHostChange = this
      .handleSMTPHostChange
      .bind(this);
    this.handleSMTPUserNameChange = this
      .handleSMTPUserNameChange
      .bind(this);
    this.handleSMTPPasswordChange = this
      .handleSMTPPasswordChange
      .bind(this);
    this.handleSMTPPortChange = this
      .handleSMTPPortChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  handleApplicationUrlChange = (event, applicationUrl) => this.setState({applicationUrl});
  handleSMTPHostChange = (event, smtpHost) => this.setState({smtpHost});
  handleSMTPUserNameChange = (event, smtpUserName) => this.setState({smtpUserName});
  handleSMTPPasswordChange = (event, smtpPassword) => this.setState({smtpPassword});
  handleSMTPPortChange = (event, smtpPort) => this.setState({smtpPort});

  componentDidMount() {
    axios.get(AUTH_BASE_URL + "smtp/1", {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      var smtpDetails = response.data;
      if (smtpDetails) {
        this.setState({
          applicationUrl: smtpDetails.applicationUrl,
          smtpHost: smtpDetails.smtpHost,
          smtpUserName: smtpDetails.smtpUserName,
          smtpPassword: smtpDetails.smtpPassword,
          smtpPort: smtpDetails.smtpPort,
          smtpDetailsPresent: true,
        })
      }
    }).catch((err) => {
      toastr.error("Error while fetching smtp details");
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    var payload = {
      applicationUrl: this.state.applicationUrl,
      smtpHost: this.state.smtpHost,
      smtpUserName: this.state.smtpUserName,
      smtpPassword: this.state.smtpPassword,
      smtpPort: this.state.smtpPort,
    };
    if (this.state.smtpDetailsPresent) {
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
      toastr.info("SMTP details created successfully");
    }
    if (nextProps.updateResponse) {
      toastr.info("SMTP details updated successfully");
    }
    if (nextProps.error) {
      toastr.error(nextProps.error.data.message);
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator name="applicationUrl" validators={requiredValidation()} errorMessages={errorMessage()} floatingLabelText="Application URL" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleApplicationUrlChange} value={this.state.applicationUrl}/>

          <TextValidator name="smtpHost" validators={requiredValidation()} errorMessages={errorMessage()} floatingLabelText="SMTP Host" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSMTPHostChange} value={this.state.smtpHost}/>

          <TextValidator name="smtpUserName" validators={requiredValidation()} errorMessages={errorMessage()} floatingLabelText="SMTP User Name" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSMTPUserNameChange} value={this.state.smtpUserName}/>

          <TextValidator name="smtpPassword" type="password" validators={requiredValidation()} errorMessages={errorMessage()} floatingLabelText="SMTP Password" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSMTPPasswordChange} value={this.state.smtpPassword}/>

          <TextValidator name="smtpPort" floatingLabelText="SMTP Port" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSMTPPortChange} value={this.state.smtpPort}/>

          <button class="btn btn-primary form-page-btn">
            Save Details
          </button>
        </ValidatorForm>
      </MuiThemeProvider>
    )
  }
}
const mapStateToProps = (state) => ({smtpDetails: state.smtp.smtpDetails, createResponse: state.smtp.createResponse, updateResponse: state.smtp.updateResponse, error: state.smtp.error});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(smtpActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);
