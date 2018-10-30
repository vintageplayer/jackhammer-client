import React, {Component} from 'react'
import SelectField from 'material-ui-selectfield'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import * as rolesActions from '../../Actions/RoleActions'
import * as permissionActions from '../../Actions/PermissionActions'
import {Button, FormGroup,} from 'react-bootstrap'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {axiosInstance} from '../../Config/AxiosInstance'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator} from 'react-material-ui-form-validator'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle,} from '../CSSModules'
import {selectionsRenderer, fetchDropdownOptions} from '../Common'

import {toastr} from 'react-redux-toastr'

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      actionNodes: [],
      selectedActionsAndTasks: {
        actions: [],
        tasks: [],
      },
      roleId: this.props.match.params.id,
    };
    this.handleRoleChange = this
      .handleRoleChange
      .bind(this);
    this.handlePermissionChange = this
      .handlePermissionChange
      .bind(this)
    this.handleTaskChange = this
      .handleTaskChange
      .bind(this)
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  handleRoleChange = (event, name) => this.setState({name});
  handlePermissionChange = (selectedPermissions, name) => this.setState({selectedPermissions})
  componentDidMount() {
    var selectedActionsAndTasks = {
      tasks: {},
      actions: {},
    }
    axiosInstance
      .post("/actions/list ", {
      limit: -1,
      rolesPage: true
    })
      .then(response => {
        this.setState({actionNodes: response.data.items})
      });
    axiosInstance
      .get("/roles/" + this.state.roleId)
      .then(response => {
        var selectedTasks = [];
        response
          .data
          .tasks
          .map(function(task) {
            selectedActionsAndTasks.tasks[task.id] = true;
            selectedActionsAndTasks.actions[task.actionId] = true;
          });
        this.setState({selectedActionsAndTasks: selectedActionsAndTasks, name: response.data.name})
      })
  }
  handleTaskChange(event) {
    var {selectedActionsAndTasks} = this.state;
    if (event.target.name === "all") {
      if (event.target.checked) {
        this
          .state
          .actionNodes
          .map(function(action) {
            selectedActionsAndTasks.actions[action.id] = true;
            action
              .tasks
              .map((task) => task.subTasks.map((subTask) => selectedActionsAndTasks.tasks[subTask.id] = true));
          });
      } else {
        this
          .state
          .actionNodes
          .map(function(action) {
            selectedActionsAndTasks.actions[action.id] = false;
            action
              .tasks
              .map((task) => task.subTasks.map((subTask) => selectedActionsAndTasks.tasks[subTask.id] = false));
          });
      }
    } else if (event.target.name === "action") {
      var selectedAction = this
        .state
        .actionNodes
        .find((action) => action.id == event.target.id)
      if (event.target.checked) {
        selectedActionsAndTasks.actions[selectedAction.id] = true;
        selectedAction
          .tasks
          .map((task) => task.subTasks.map((subTask) => selectedActionsAndTasks.tasks[subTask.id] = true))
      } else {
        selectedActionsAndTasks.actions[selectedAction.id] = false;
        selectedAction
          .tasks
          .map((task) => task.subTasks.map((subTask) => selectedActionsAndTasks.tasks[subTask.id] = false))
      }
    } else {
      if (event.target.checked) {
        selectedActionsAndTasks.tasks[event.target.id] = true;
      } else {
        selectedActionsAndTasks.tasks[event.target.id] = false;
      }
    }
    this.setState({selectedActionsAndTasks: selectedActionsAndTasks})
  }

  handleSubmit(event) {
    event.preventDefault();
    var selectedTasks = [];
    for (var task in this.state.selectedActionsAndTasks.tasks) {
      if (this.state.selectedActionsAndTasks.tasks[task])
        selectedTasks.push(parseInt(task))
    }
    if (selectedTasks == 0) {
      toastr.error("Please select at least one task");
      return;
    }
    var payload = {
      'id': this.state.roleId,
      'name': this.state.name,
      'taskIds': selectedTasks
    };
    this
      .props
      .actions
      .updateRole(payload, this.state.roleId);
  }
  renderRoleName() {
    var validationRole = ['required'];
    var errorMessages = ['this field is required'];
    return (<TextValidator value={this.state.name} validators={validationRole} name="name" errorMessages={errorMessages} floatingLabelText="Role Name" onChange={this.handleRoleChange} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>);
  }
  renderPermissionList(selectedPermissions, permissionNodes) {
    return (
      <SelectField name='selectedPermissions' hintText='' floatingLabel='Permission' value={selectedPermissions} onChange={this.handlePermissionChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} multiple checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
        {fetchDropdownOptions(permissionNodes)}
      </SelectField>
    )
  }
  renderTasks(actions) {
    if (actions === 0)
      return null;
    return (actions.map((action, index) => <div key={action.id} class="col-xs-4">
      <fieldset>
        <legend>
          <span class="right-buffer">
            {action.name}
          </span>
          <input id={action.id} name="action" type="checkbox" checked={this.state.selectedActionsAndTasks.actions[action.id]} onChange={this.handleTaskChange}/>
        </legend>
        {action
          .tasks
          .map((task) => <div key={task.id}>
            <span class='task-title'>
              {task.name}
            </span>
            <div class="child-tasks">
              {this.renderChildTasks(task.subTasks)}
            </div>
          </div>)
}
      </fieldset>
    </div>));
  }
  renderChildTasks(childTasks) {
    if (childTasks.length === 0)
      return null;
    return (childTasks.map((childTask) => <span key={childTask.id} class="checkbox-inline">
      <input id={childTask.id} name="task" type="checkbox" checked={this.state.selectedActionsAndTasks.tasks[childTask.id]} onChange={this.handleTaskChange}/> {childTask.name}
    </span>));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.updateResponse) {
      this
        .context
        .router
        .history
        .push('/roles', {state: 'state'});
      toastr.success('Role updated successfully');
    }
    if (nextProps.error) {
      toastr.error(nextProps.error.data.message);
    }
  }

  render() {
    const {selectedActionsAndTasks, actionNodes} = this.state;
    return (
      <div>
        <section class="content-header">
          <h4>
            Roles
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="#">
                <i class="fa fa-dashboard"></i>
                Home
              </a>
            </li>
            <li class="active">
              <a href="#">Roles</a>
            </li>
            <li class="active">
              <a href="#">Edit Role</a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="card">
            <h4 class="card-title">Edit Role</h4>
            <div class="card-body">
              <MuiThemeProvider>
                <ValidatorForm onSubmit={this.handleSubmit}>
                  {this.renderRoleName()}
                  <div class="row">
                    <h4 class="card-title">
                      Select/Assign Tasks
                    </h4>
                  </div>
                  <div class="row">
                    <div class="col-xs-4">
                      <div class="checkbox select-all-tasks">
                        <input type="checkbox" name="all" onChange={this.handleTaskChange}/>
                        <span class='task-title'>
                          Select All Tasks
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    {this.renderTasks(actionNodes)}
                  </div>
                  <div class="row">
                    <div class="col-md-4 col-md-offset-4 scan-now-btn">
                      <FormGroup class="sign-in-form-group">
                        <Button block bsSize="large" class="btn btn-success signup-button" type="submit">
                          Save
                        </Button>
                      </FormGroup>
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
const mapStateToProps = (state) => ({error: state.roles.error, role: state.roles.role, fetchedPermissions: state.permissions.fetchedPermissions, updateResponse: state.roles.updateResponse});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, rolesActions, permissionActions), dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Edit)
