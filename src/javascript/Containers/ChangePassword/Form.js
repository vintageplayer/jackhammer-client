import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as userActions from '../../Actions/UserActions'
import * as authActions from '../../Actions/AuthActions'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator} from 'react-material-ui-form-validator'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle} from '../CSSModules'

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
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
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
  componentWillMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.newPassword) {
        return false;
      }
      return true;
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    var payload = {
      password: this.state.currentPassword,
      newPassword: this.state.newPassword
    };
    this
      .props
      .actions
      .updatePassword(payload);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users.updatePassword) {
      toastr.success("Password updated successfully,Please login again");
      this
        .props
        .actions
        .userSignout()
    }
    if (nextProps.users.error) {
      toastr.error(nextProps.users.error.data.message);
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator name="currentPassword" type="password" validators={['required']} errorMessages={['this field is required']} value={this.state.currentPassword} floatingLabelText="Current Password" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleChange}/>

          <TextValidator name="newPassword" type="password" validators={['required']} errorMessages={['this field is required']} value={this.state.newPassword} floatingLabelText="New password" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleChange}/>

          <TextValidator name="newPasswordConfirmation" type="password" validators={['required', 'isPasswordMatch',]} errorMessages={['this field is required', 'password mismatch',]} value={this.state.newPasswordConfirmation} floatingLabelText="Confirmation Password" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleChange}/>

          <button class="btn btn-primary form-page-btn" type="submit">
            Change Password
          </button>
        </ValidatorForm>
      </MuiThemeProvider>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, authActions), dispatch)
  };
}
const mapStateToProps = (state) => ({users: state.users});
export default connect(mapStateToProps, mapDispatchToProps)(Form)
