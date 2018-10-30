import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import localStorage from 'localStorage'
import axios from 'axios'
import * as AuthActions from '../../Actions/AuthActions'
import * as scanTypeActions from '../../Actions/ScanTypeActions'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator} from 'react-material-ui-form-validator'
import {Link} from 'react-router-dom'
import {Button, FormGroup} from 'react-bootstrap';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr'
import {axiosInstance} from '../../Config/AxiosInstance'
import {UNAUTH_BASE_URL, DEFAULT_HEADERS,} from '../../Config/Constants'

const underlineFocusStyle = {
  borderColor: "#7cc576"
};
const floatingLabelFocusStyle = {
  color: "#7cc576"
}
const errorStyle = {
  color: "#f44336"
}

class Form extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
  renderPasswordField() {
    var validationRules = ['required'];
    var errorMessages = ['this field is required'];
    return (<TextValidator type="password" validators={validationRules} errorMessages={errorMessages} name="password" value={this.state.password} floatingLabelText="Password" onChange={this.handleChange} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>);
  }
  handleSubmit(event) {
    event.preventDefault();
    var payload = {
      'email': this.state.email,
      'password': this.state.password
    };
    this
      .props
      .actions
      .login(payload);
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
    if (nextProps.auth.authenticated && nextProps.fetchedScanTypes.length === 0) {
      var scanTypes = [];
      var ownerTypes = [];
      var currentActions = this.props.actions;
      currentActions.fetchAllScanTypes({limit: -1});
      toastr.info("You have been successfully logged in.");
    } else if (nextProps.auth.error) {
      toastr.error(nextProps.auth.error.data.message);
    } else if (nextProps.fetchedScanTypes.length > 0 && nextProps.auth.authenticated) {
      var ownerTypes = nextProps.auth.currentUser.ownerTypes;
      var corporateOwner = ownerTypes.find((ownerType) => ownerType.name === 'Corporate');
      var teamOwner = ownerTypes.find((ownerType) => ownerType.name === 'Team');
      var personalOwner = ownerTypes.find((ownerType) => ownerType.name === 'Personal');
      var sourceCodeScanType = nextProps
        .fetchedScanTypes
        .find((scanType) => scanType.isStatic === true);
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
        console.log("teamOwner===teamOwner", teamOwner);
        console.log("sourceCodeScanType===sourceCodeScanType", sourceCodeScanType.id);
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
          {this.renderEmailField()}
          {this.renderPasswordField()}
          <FormGroup class="sign-in-form-group">
            <Button block bsSize="large" class="btn btn-success login-button" type="submit">
              Login
            </Button>
          </FormGroup>
          <FormGroup>
            <p class="form-group flipInY wow animated m-lg-bottom m-md-top">
              <Link to="/forgot_password" class="forgot-password-link">Forgot Password?</Link>
              <Link to="/signup" class="btn  singnup-button btn-sm p-sm-top-bottom m-0-top-bottom">
                Sign up
              </Link>
            </p>
          </FormGroup>
        </ValidatorForm>
      </MuiThemeProvider>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, AuthActions, scanTypeActions), dispatch)
  };
}
const mapStateToProps = (state) => ({auth: state.auth, fetchedScanTypes: state.scanTypes.fetchedScanTypes, ownerType: state.scanTypes.ownerType});
export default connect(mapStateToProps, mapDispatchToProps)(Form)
