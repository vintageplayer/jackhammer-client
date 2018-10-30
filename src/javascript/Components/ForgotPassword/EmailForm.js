import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as resetPasswordActions from '../../Actions/ResetPasswordActions'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator} from 'react-material-ui-form-validator'
import {Link} from 'react-router-dom'
import {Button, FormGroup,} from 'react-bootstrap';
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

class EmailForm extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      email: ''
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

  renderEmailField() {
    var validationRules = ['required', 'isEmail',];
    var errorMessages = ['this field is required', 'email is not valid',];
    return (<TextValidator validators={validationRules} errorMessages={errorMessages} name="email" value={this.state.email} floatingLabelText="Email" floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleChange} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} errorStyle={errorStyle}/>);
  }

  handleSubmit(event) {
    event.preventDefault();
    var payload = {
      'email': this.state.email
    };
    this
      .props
      .actions
      .sendResetPasswordInstructions(payload);
  }
  componentWillMount() {
    if (this.props.auth.authenticated) {
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
  componentWillReceiveProps(nextProps) {
    toastr.success("Password instructions has sent to your mail");
  }

  render() {
    return (
      <MuiThemeProvider>
        <ValidatorForm onSubmit={this.handleSubmit}>
          {this.renderEmailField()}
          <FormGroup class="sign-in-form-group">
            <Button block bsSize="large" class="btn btn-success login-button" type="submit">
              Reset Password
            </Button>
          </FormGroup>
          <FormGroup>
            <p class="form-group flipInY wow animated m-lg-bottom m-md-top">
              <Link to="/login" class="btn  singnup-button btn-sm p-sm-top-bottom m-0-top-bottom">Login</Link>
              <Link to="/signup" class="btn  singnup-button btn-sm p-sm-top-bottom m-0-top-bottom">Sign up</Link>
            </p>
          </FormGroup>
        </ValidatorForm>
      </MuiThemeProvider>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resetPasswordActions, dispatch)
  };
}
const mapStateToProps = (state) => ({auth: state.auth, fetchedScanTypes: state.scanTypes.fetchedScanTypes, ownerType: state.scanTypes.ownerType, resetPassword: state.resetPassword});
export default connect(mapStateToProps, mapDispatchToProps)(EmailForm)
