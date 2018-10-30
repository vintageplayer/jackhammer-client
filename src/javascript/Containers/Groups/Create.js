import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui-selectfield'
import * as groupActions from '../../Actions/GroupActions'
import * as roleActions from '../../Actions/RoleActions'
import {TextValidator} from 'react-material-ui-form-validator'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle,} from '../CSSModules'
import {selectionsRenderer, fetchDropdownOptions} from '../Common'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toastr} from 'react-redux-toastr'
import {Link} from 'react-router-dom'
import {ValidatorForm} from 'react-form-validator-core'

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      roleNodes: [],
      selectedRoles: []
    }
    this.handleRoleChange = this
      .handleRoleChange
      .bind(this)
    this.handleSubmit = this
      .handleSubmit
      .bind(this)
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  handleGroupChange = (event, name) => this.setState({name});
  handleRoleChange = (selectedRoles, name) => this.setState({selectedRoles});
  groupsLink() {
    return (
      <Link to="/groups">
        Groups
      </Link>
    )
  }
  handleSubmit(event) {
    event.preventDefault();
    var roleIds = [];
    this
      .state
      .selectedRoles
      .map((role) => (roleIds.push(role.value)));
    var payload = {
      name: this.state.name,
      roleIds: roleIds
    };
    this
      .props
      .actions
      .createGroup(payload);
  }
  componentDidMount() {
    this
      .props
      .actions
      .fetchAllRoles({limit: -1});
  }

  renderGroupName() {
    return (<TextValidator name="name" value={this.state.name} floatingLabelText="Group Name" onChange={this.handleGroupChange} fullWidth={true} validators={['required']} errorMessages={['this field is required']} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>);
  }
  renderRoleList(selectedRoles, fetchedRoles) {
    return (
      <SelectField name='selectedRoles' hintText='' floatingLabel='Role' value={selectedRoles} onChange={this.handleRoleChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} multiple checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
        {fetchDropdownOptions(fetchedRoles)}
      </SelectField>
    )
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.createResponse) {
      this
        .context
        .router
        .history
        .push('/groups', {state: 'state'});
      toastr.success('Group created successfully');
    }
    if (nextProps.error) {
      toastr.error(nextProps.error.data.message)
    }
  }
  render() {
    const {selectedRoles} = this.state;
    const {fetchedRoles} = this.props;
    return (
      <div class="page-wrapper">
        <section class="content-header">
          <h4>
            Groups
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="/">
                <i class="fa fa-dashboard"></i>
                Home
              </a>
            </li>
            <li class="active">
              {this.groupsLink()}
            </li>
            <li class="active">
              <a href="#">Create Group</a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="card">
            <h4 class="card-title">Add Group</h4>
            <div class="card-body">
              <MuiThemeProvider>
                <ValidatorForm onSubmit={this.handleSubmit}>
                  {this.renderGroupName()}
                  {this.renderRoleList(selectedRoles, fetchedRoles)}
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
const mapStateToProps = (state) => ({fetchedRoles: state.roles.fetchedRoles, createResponse: state.groups.createResponse, error: state.groups.error,});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, roleActions, groupActions), dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Create)
