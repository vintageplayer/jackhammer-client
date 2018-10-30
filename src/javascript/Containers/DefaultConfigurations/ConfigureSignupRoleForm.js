import React, {Component} from 'react'
import MenuItem from 'material-ui/MenuItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as roleActions from '../../Actions/RoleActions'
import * as defaultRoleActions from '../../Actions/defaultRoleActions'
import {ValidatorForm} from 'react-form-validator-core'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle} from '../CSSModules'
import {selectionsRenderer, fetchDropdownOptions,} from '../Common'
import {SelectValidator} from 'react-material-ui-form-validator'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {axiosInstance} from '../../Config/AxiosInstance'
import {toastr} from 'react-redux-toastr'

const requiredValidation = () => ['required'];
const errorMessage = () => ['this field is required'];

class ConfigureSignupRoleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDefaultRole: null,
      defaultRolePresent: false,
    };
    this.handleDefaultRoleChange = this
      .handleDefaultRoleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }
  handleDefaultRoleChange = (event, index, selectedDefaultRole) => this.setState({selectedDefaultRole});

  componentDidMount() {
    axiosInstance
      .get("default_role/1")
      .then((response) => {
        var defaultRoleDetails = response.data;
        if (defaultRoleDetails) {
          this.setState({selectedDefaultRole: defaultRoleDetails.roleId, defaultRolePresent: true})
        }
      })
      .catch((err) => {
        toastr.error("Error while fetching default role details");
      });
    this
      .props
      .actions
      .fetchAllRoles({limit: -1});
  }

  renderRoleList(selectedDefaultRole, fetchedRoles) {
    if (fetchedRoles == null)
      return;
    return (
      <SelectValidator fullWidth={true} value={selectedDefaultRole} name="selectedDefaultRole" validators={requiredValidation()} errorMessages={errorMessage()} floatingLabelText="Default Role" onChange={this.handleDefaultRoleChange} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}>
        {fetchedRoles.map((role, index) => <MenuItem value={role.id} key={role.id} primaryText={role.name}/>)}
      </SelectValidator>
    )
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.createResponse) {
      toastr.success("Default role created successfully");
    }
    if (nextProps.updateResponse) {
      toastr.success("Default role updated successfully");
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    var payload = {
      roleId: this.state.selectedDefaultRole
    }
    if (this.state.selectedDefaultRole) {
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
  render() {
    const {fetchedRoles} = this.props;
    const {selectedDefaultRole} = this.state;
    return (
      <MuiThemeProvider>
        <ValidatorForm onSubmit={this.handleSubmit}>
          {this.renderRoleList(selectedDefaultRole, fetchedRoles)}
          <button class="btn btn-primary form-page-btn" type="submit">
            Save
          </button>
        </ValidatorForm>
      </MuiThemeProvider>
    )
  }
}
const mapStateToProps = (state) => ({defaultRole: state.defaultRole.defaultRole, createResponse: state.defaultRole.createResponse, updateResponse: state.defaultRole.updateResponse, fetchedRoles: state.roles.fetchedRoles});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, defaultRoleActions, roleActions), dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigureSignupRoleForm)
