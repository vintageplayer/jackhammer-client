import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as hardcodeSecretActions from '../../Actions/HardcodeSecretActions'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle} from '../CSSModules'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator, DateValidator,} from 'react-material-ui-form-validator'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {axiosInstance} from '../../Config/AxiosInstance'
import {toastr} from 'react-redux-toastr'

const requiredValidation = () => ['required'];
const errorMessage = () => ['this field is required'];

class HardcodeSecretConfiguration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commitsDepth: 5,
      commitsStartDate: null,
      regex: '',
      hardcodeSecretsPresent: false
    };
    this.handleCommitsChange = this
      .handleCommitsChange
      .bind(this);

    this.handleCommitsStartDate = this
      .handleCommitsStartDate
      .bind(this);

    this.handleRegexChange = this
      .handleRegexChange
      .bind(this);

    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }
  handleCommitsChange = (event, commitsDepth) => this.setState({commitsDepth})
  handleCommitsStartDate = (event, commitsStartDate) => this.setState({commitsStartDate})
  handleRegexChange = (event, regex) => this.setState({regex})

  componentDidMount() {
    axiosInstance
      .get("hardcode_secret/1")
      .then((response) => {
        var hardcodeSecrets = response.data;
        if (hardcodeSecrets) {
          this.setState({
            commitsDepth: hardcodeSecrets.commitsDepth,
            commitsStartDate: new Date(hardcodeSecrets.commitsStartDate),
            regex: hardcodeSecrets.regex,
            hardcodeSecretsPresent: true
          })
        }
      })
      .catch((err) => {
        toastr.error("Error while fetching hardcode secret details");
      });
  }
  handleSubmit(event) {

    event.preventDefault();

    var payload = {
      commitsDepth: this.state.commitsDepth,
      commitsStartDate: this.state.commitsStartDate,
      regex: this.state.regex,
    };
    if (this.state.hardcodeSecretsPresent) {
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
  }
  render() {
    return (
      <MuiThemeProvider>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator validators={requiredValidation()} errorMessages={errorMessage()} name="commitsDepth" value={this.state.commitsDepth} floatingLabelText="Commits depth" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleCommitsChange}/>

          <DateValidator validators={requiredValidation()} errorMessages={errorMessage()} name="commitsStartDate" value={this.state.commitsStartDate} floatingLabelText="Commit start date" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleCommitsStartDate}/>

          <TextValidator validators={requiredValidation()} errorMessages={errorMessage()} name="regex" value={this.state.regex} floatingLabelText="Regx" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleRegexChange}/>

          <button class="btn btn-primary form-page-btn" type="submit">
            Save
          </button>
        </ValidatorForm>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({hardcodeSecrets: state.hardcodeSecrets.hardcodeSecrets, createResponse: state.hardcodeSecrets.createResponse, updateResponse: state.hardcodeSecrets.updateResponse,});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(hardcodeSecretActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(HardcodeSecretConfiguration)
