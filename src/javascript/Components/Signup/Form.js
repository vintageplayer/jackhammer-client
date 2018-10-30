import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as AuthActions from '../../Actions/AuthActions'
import * as scanTypeActions from '../../Actions/ScanTypeActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator} from 'react-material-ui-form-validator'
import {toastr} from 'react-redux-toastr'
import {Button, FormGroup,} from 'react-bootstrap'

const underlineFocusStyle = {
  borderColor: "#7cc576"
};
const floatingLabelFocusStyle = {
  color: "#7cc576"
}
const errorStyle = {
  color: "#f44336"
}

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmationPassword: '',
    };
    this.state = {}
    this.handleSubmit = this
      .handleSubmit
      .bind(this)
    this.handleChange = this
      .handleChange
      .bind(this)
  }
  static contextTypes = {
    router: React.PropTypes.object
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
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
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var payload = {
      'name': this.state.username,
      'email': this.state.email,
      'password': this.state.password,
    };
    this
      .props
      .actions
      .signup(payload)
  }
  renderNameField() {
    var validationRules = ['required'];
    var errorMessages = ['this field is required'];
    return (<TextValidator validators={validationRules} errorMessages={errorMessages} name="username" value={this.state.username} floatingLabelText="Username" floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleChange} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} errorStyle={errorStyle}/>);
  }
  renderEmailField() {
    var validationRules = ['required', 'isEmail',];
    var errorMessages = ['this field is required', 'email is not valid',];
    return (<TextValidator validators={validationRules} errorMessages={errorMessages} name="email" value={this.state.email} floatingLabelText="Email" floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleChange} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} errorStyle={errorStyle}/>);
  }
  renderPasswordField() {
    var validationRules = ['required'];
    var errorMessages = ['this field is required'];
    return (<TextValidator type="password" validators={validationRules} errorMessages={errorMessages} name="password" value={this.state.password} floatingLabelText="Password" onChange={this.handleChange} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>);
  }
  renderConfirmationPasswordField() {
    var validationRules = ['isPasswordMatch', 'required',];
    var errorMessages = ['password mismatch', 'this field is required',];
    return (<TextValidator type="password" validators={validationRules} errorMessages={errorMessages} name="confirmationPassword" value={this.state.confirmationPassword} floatingLabelText="Confirmation Password" onChange={this.handleChange} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>);
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps.auth.error", nextProps.auth.error);
    if (nextProps.auth.authenticated && nextProps.fetchedScanTypes.length === 0) {
      var scanTypes = [];
      var ownerTypes = [];
      var currentActions = this.props.actions;
      currentActions.fetchAllScanTypes({limit: -1});
      toastr.info("You have been successfully logged in.");
    } else if (nextProps.auth.error) {
      toastr.error(nextProps.auth.error.data.message);
    } else if (nextProps.auth.authenticated && nextProps.fetchedScanTypes.length > 0) {
      var sourceCodeScanType = nextProps
        .fetchedScanTypes
        .find((scanType) => scanType.isStatic === true);
      var ownerTypes = nextProps.auth.currentUser.ownerTypes;
      var corporateOwner = ownerTypes.find((ownerType) => ownerType.name === 'Corporate');
      var teamOwner = ownerTypes.find((ownerType) => ownerType.name === 'Team');
      var personalOwner = ownerTypes.find((ownerType) => ownerType.name === 'Personal');
      if (nextProps.auth.currentUser.allowedExecutiveDashboard) {
        this
          .context
          .router
          .history
          .push("/excutive_dashboard/" + nextProps.ownerType.id + "/" + sourceCodeScanType.id, {state: 'state'});
      } else if (nextProps.auth.currentUser.allowedCorporateDashboard) {
        this
          .context
          .router
          .history
          .push("/dashboard/" + corporateOwner.id + "/" + sourceCodeScanType.id, {state: 'state'});
      } else if (nextProps.auth.currentUser.allowedTeamDashboard) {
        this
          .context
          .router
          .history
          .push("/dashboard/" + teamOwner.id + "/" + sourceCodeScanType.id, {state: 'state'});
      } else {
        this
          .context
          .router
          .history
          .push("/dashboard/" + personalOwner.id + "/" + sourceCodeScanType.id, {state: 'state'});
      }
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <ValidatorForm onSubmit={this.handleSubmit}>
          {this.renderNameField()}
          {this.renderEmailField()}
          {this.renderPasswordField()}
          {this.renderConfirmationPasswordField()}
          <FormGroup class="sign-in-form-group">
            <Button block bsSize="large" class="btn btn-success signup-button" type="submit">
              Get Started
            </Button>
          </FormGroup>
        </ValidatorForm>
      </MuiThemeProvider>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, AuthActions, scanTypeActions), dispatch)
  };
}
const mapStateToProps = (state) => ({auth: state.auth, fetchedScanTypes: state.scanTypes.fetchedScanTypes, ownerType: state.scanTypes.ownerType});
export default connect(mapStateToProps, mapDispatchToProps)(Form)
