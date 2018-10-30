import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui-selectfield'
import * as userActions from '../../Actions/UserActions'
import * as groupActions from '../../Actions/GroupActions'
import * as roleActions from '../../Actions/RoleActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {axiosInstance} from '../../Config/AxiosInstance'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle,} from '../CSSModules'
import {selectionsRenderer, fetchDropdownOptions,} from '../Common'
import {toastr} from 'react-redux-toastr'
import {Link} from 'react-router-dom'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator, SelectValidator} from 'react-material-ui-form-validator'

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      roleNodes: [],
      selectedRoles: [],
      groupNodes: [],
      selectedGroups: [],
      userId: this.props.match.params.id,
    };
    this.handleRoleChange = this
      .handleRoleChange
      .bind(this)
    this.handleGroupChange = this
      .handleGroupChange
      .bind(this)
    this.handleSubmit = this
      .handleSubmit
      .bind(this)
  }
  static contextTypes = {
    router: React.PropTypes.object
  };

  handleGroupChange = (selectedGroups, name) => this.setState({selectedGroups});
  handleRoleChange = (selectedRoles, name) => this.setState({selectedRoles})
  usersLink() {
    return (
      <Link to="/users">
        <i class='fa fa-users'></i>
        Users
      </Link>
    )
  }
  componentDidMount() {
    axiosInstance
      .post("/roles/list ", {limit: -1})
      .then(response => {
        this.setState({roleNodes: response.data.items})
      });
    axiosInstance
      .post("/groups/list ", {limit: -1})
      .then(response => {
        this.setState({groupNodes: response.data.items})
      });
    axiosInstance
      .get("/users/" + this.props.match.params.id)
      .then(response => {
        var selectedRoles = [];
        response
          .data
          .roles
          .map((role) => (selectedRoles.push({value: role.id, label: role.name,})));
        var selectedGroups = [];
        response
          .data
          .groups
          .map((group) => (selectedGroups.push({value: group.id, label: group.name,})));
        this.setState({selectedRoles: selectedRoles, selectedGroups: selectedGroups, email: response.data.email,})
      })
  }
  handleSubmit(event) {
    event.preventDefault();
    var groupIds = [];
    this
      .state
      .selectedGroups
      .map((group) => (groupIds.push(group.value)));
    var roleIds = [];
    this
      .state
      .selectedRoles
      .map((role) => (roleIds.push(role.value)));
    var payload = {
      id: this.props.match.params.id,
      roleIds: roleIds,
      groupIds: groupIds,
    };
    this
      .props
      .actions
      .updateUser(payload, this.props.match.params.id);
  }
  renderUserEmail() {
    return (<TextValidator name="email" floatingLabelText="Email" value={this.state.email} validators={['required']} errorMessages={['this field is required']} fullWidth={true} disabled={true}/>);
  }
  renderGroupList(selectedGroups, groupNodes) {
    return (
      <SelectField name='selectedGroups' validators={['required']} errorMessages={['this field is required']} hintText='' floatingLabel='Group' value={selectedGroups} onChange={this.handleGroupChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} multiple checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
        {fetchDropdownOptions(groupNodes)}
      </SelectField>
    )
  }
  renderRoleList(selectedRoles, roleNodes) {
    return (
      <SelectField validators={['required']} errorMessages={['this field is required']} name='selectedRoles' hintText='' floatingLabel='Role' value={selectedRoles} onChange={this.handleRoleChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} multiple checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
        {fetchDropdownOptions(roleNodes)}
      </SelectField>
    )
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.updateResponse) {
      this
        .context
        .router
        .history
        .push('/users', {state: 'state'});
      toastr.success('User updated successfully');
    }
    if (nextProps.error) {
      toastr.error(nextProps.error.data.message);
    }
  }
  render() {
    const {selectedGroups, groupNodes, selectedRoles, roleNodes,} = this.state;
    return (
      <div>
        <section class="content-header">
          <h4>
            Users
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="/">
                <i class="fa fa-home"></i>
                Home
              </a>
            </li>
            <li class="active">
              {this.usersLink()}
            </li>
            <li class="active">
              <a href="#">Edit User</a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="card">
            <h4 class="card-title">Edit User</h4>
            <div class="card-body">
              <MuiThemeProvider>
                <ValidatorForm onSubmit={this.handleSubmit}>
                  {this.renderUserEmail()}
                  {this.renderGroupList(selectedGroups, groupNodes)}
                  {this.renderRoleList(selectedRoles, roleNodes)}
                  <div class='row'>
                    <div class='col-md-6'>
                      <button class="btn btn-primary form-page-btn" type="submit">
                        Save
                      </button>
                    </div>
                  </div>
                </ValidatorForm>
              </MuiThemeProvider>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({updateResponse: state.users.updateResponse, error: state.users.error,});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, roleActions, groupActions, userActions), dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Edit)
