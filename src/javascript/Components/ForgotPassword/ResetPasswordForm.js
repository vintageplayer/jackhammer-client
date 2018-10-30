import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as resetPasswordActions from '../../Actions/ResetPasswordActions'
import * as scanTypeActions from '../../Actions/ScanTypeActions'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator} from 'react-material-ui-form-validator'
import {Link} from 'react-router-dom'
import {Button, FormGroup} from 'react-bootstrap';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr'

const underlineFocusStyle = {
  borderColor: "#7cc576"
};
const floatingLabelFocusStyle = {
  color: "#7cc576"
}
const errorStyle = {
  color: "#f44336"
}

class ResetPasswordForm extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirmation: '',
    };
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.handleChange = this
      .handleChange
      .bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this
      .props
      .actions
      .resetPassword(this.state.password, this.props.passwordToken);
  }
  componentWillMount() {
    this
      .props
      .actions
      .verifyResetPasswordToken(this.props.passwordToken);
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.resetPassword.error) {
      toastr.error("Reset Password token is invalid")
      this
        .context
        .router
        .history
        .push("/not_found", {state: 'state'})
    }
    if (nextProps.auth.authenticated && nextProps.fetchedScanTypes.length === 0) {
      var scanTypes = [];
      var ownerTypes = [];
      var currentActions = this.props.actions;
      currentActions.fetchAllScanTypes({limit: -1});
      toastr.info("Reset password has done successfully");
    }
    if (nextProps.auth.authenticated && nextProps.fetchedScanTypes.length > 0) {
      var sourceCodeScanType = this
        .props
        .fetchedScanTypes
        .find((scanType) => scanType.isStatic === true);
      this
        .context
        .router
        .history
        .push("/excutive_dashboard/" + this.props.ownerType.id + "/" + sourceCodeScanType.id, {state: 'state'});
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <ValidatorForm onSubmit={this.handleSubmit}>

          <TextValidator name="password" type="password" value={this.state.password} validators={['required']} errorMessages={['this field is required']} floatingLabelText="New password" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleChange}/>

          <TextValidator name="passwordConfirmation" type="password" value={this.state.passwordConfirmation} validators={['required', 'isPasswordMatch',]} errorMessages={['this field is required', 'password mismatch',]} floatingLabelText="Confirmation Password" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleChange}/>

          <FormGroup class="sign-in-form-group">
            <Button block bsSize="large" class="btn btn-success login-button" type="submit">
              Reset Password
            </Button>
          </FormGroup>

        </ValidatorForm>
      </MuiThemeProvider>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, scanTypeActions, resetPasswordActions), dispatch)
  };
}
const mapStateToProps = (state) => ({auth: state.auth, fetchedScanTypes: state.scanTypes.fetchedScanTypes, ownerType: state.scanTypes.ownerType, resetPassword: state.resetPassword,});
export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm)
