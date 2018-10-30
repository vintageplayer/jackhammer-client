import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as applicationActions from '../../Actions/NavigationActions'
import * as rolesActions from '../../Actions/RoleActions'
import * as permissionActions from '../../Actions/PermissionActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator} from 'react-material-ui-form-validator'
import {Button, FormGroup,} from 'react-bootstrap'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle} from '../CSSModules'
import {selectionsRenderer, fetchDropdownOptions,} from '../Common'

import {toastr} from 'react-redux-toastr'

class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      selectedActionsAndTasks: {
        actions: [],
        tasks: []
      },
      checked: false
    }
    this.handlePermissionChange = this
      .handlePermissionChange
      .bind(this)
    this.handleRoleChange = this
      .handleRoleChange
      .bind(this)
    this.handleTaskChange = this
      .handleTaskChange
      .bind(this)
    this.handleSubmit = this
      .handleSubmit
      .bind(this)
  }
  static contextTypes = {
    router: React.PropTypes.object
  };

  handleRoleChange = (event, name) => this.setState({name});
  handlePermissionChange = (selectedPermissions, name) => this.setState({selectedPermissions});

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
      'name': this.state.name,
      'taskIds': selectedTasks
    };
    this
      .props
      .actions
      .createRole(payload);
  }
  componentDidMount() {
    this
      .props
      .actions
      .fetchAllNavigationActions({limit: -1});
  }
  renderRoleName() {
    var validationRole = ['required'];
    var errorMessages = ['this field is required'];
    return (<TextValidator value={this.state.name} validators={validationRole} name="name" errorMessages={errorMessages} floatingLabelText="Role Name" onChange={this.handleRoleChange} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>);
  }
  handleTaskChange(event) {
    var {selectedActionsAndTasks} = this.state;
    if (event.target.name === "all") {
      if (event.target.checked) {
        this
          .props
          .fetchedActions
          .map(function(action) {
            selectedActionsAndTasks.actions[action.id] = true;
            action
              .tasks
              .map((task) => task.subTasks.map((subTask) => selectedActionsAndTasks.tasks[subTask.id] = true));
          });
      } else {
        this
          .props
          .fetchedActions
          .map(function(action) {
            selectedActionsAndTasks.actions[action.id] = false;
            action
              .tasks
              .map((task) => task.subTasks.map((subTask) => selectedActionsAndTasks.tasks[subTask.id] = false));
          });
      }
    } else if (event.target.name === "action") {
      var selectedAction = this
        .props
        .fetchedActions
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
  getGridClass(index) {
    if (index % 2 === 0) {
      return "col-xs-6";
    }
    return "col-xs-6";
  }
  renderTasks(actions) {
    if (actions === 0)
      return null;
    return (actions.map((action, index) => <div key={action.id} class={this.getGridClass(index)}>
      <fieldset>
        <legend>
          <span class="right-buffer">
            {action.name}
          </span>
          <input id={action.id} name="action" type="checkbox" onChange={this.handleTaskChange} checked={this.state.selectedActionsAndTasks.actions[action.id]}/>
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
      <input id={childTask.id} name="task" type="checkbox" onChange={this.handleTaskChange} checked={this.state.selectedActionsAndTasks.tasks[childTask.id]}/> {childTask.name}
    </span>));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.fetchedActions.length > 0) {
      let taskList = {
        actions: {},
        tasks: {}
      };
      nextProps
        .fetchedActions
        .map(function(action) {
          taskList.actions[action.id] = false;
          action
            .tasks
            .map(function(task) {
              taskList.tasks[task.id] = false;
              task
                .subTasks
                .map(function(subTask) {
                  taskList.tasks[subTask.id] = false;
                })
            })
        });
      this.setState({selectedActionsAndTasks: taskList});
    }
    if (nextProps.createResponse) {
      this
        .context
        .router
        .history
        .push('/roles', {state: 'state'});
      toastr.success('Role created successfully');
    }
    if (nextProps.error) {
      toastr.error(nextProps.error.data.message);
    }
  }

  render() {
    const {fetchedActions} = this.props;
    return (
      <div class="page-wrapper">
        <section class="content-header">
          <h4>
            Roles
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="#">
                <i class="fa fa-dashboard"></i>
                Home</a>
            </li>
            <li class="active">
              <a href="#">Roles</a>
            </li>
            <li class="active">
              <a href="#">Create Role</a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="card">
            <h4 class="card-title">Add Role</h4>
            <div class="card-body">
              <MuiThemeProvider>
                <ValidatorForm onSubmit={this.handleSubmit}>
                  {this.renderRoleName()}
                  <div class="row">
                    <h4>
                      Select/Assign Tasks
                    </h4>
                  </div>
                  <div class="row">
                    <div class="col-xs-4 left-buffer">
                      <div class="checkbox select-all-tasks">
                        <input type="checkbox" name="all" onChange={this.handleTaskChange}/>
                        <span class='task-title'>
                          Select All Tasks
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    {this.renderTasks(fetchedActions)}
                  </div>
                  <div class="row">
                    <div class="col-md-4 scan-now-btn">
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
const mapStateToProps = (state) => ({fetchedActions: state.actions.fetchedActions, createResponse: state.roles.createResponse, error: state.roles.error,});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, rolesActions, applicationActions), dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Create)
