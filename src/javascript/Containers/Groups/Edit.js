import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui-selectfield'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as rolesActions from '../../Actions/RoleActions'
import * as groupActions from '../../Actions/GroupActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {axiosInstance} from '../../Config/AxiosInstance'
import {Button, FormGroup} from 'react-bootstrap'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle,} from '../CSSModules'
import {selectionsRenderer, fetchDropdownOptions} from '../Common'
import {toastr} from 'react-redux-toastr'
import {Link} from 'react-router-dom'

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      roleNodes: [],
      selectedRoles: [],
      groupId: this.props.match.params.id
    };
    this.handleGroupChange = this
      .handleGroupChange
      .bind(this);
    this.handleRoleChange = this
      .handleRoleChange
      .bind(this)
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
  };

  handleGroupChange = (event, name) => this.setState({name});
  handleRoleChange = (selectedRoles, name) => this.setState({selectedRoles})

  groupsLinks() {
    return (
      <Link to="/groups">
        Groups
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
      .get("/groups/" + this.props.match.params.id)
      .then(response => {
        var selectedRoles = [];
        response
          .data
          .roles
          .map((role) => (selectedRoles.push({value: role.id, label: role.name})));
        this.setState({selectedRoles: selectedRoles, name: response.data.name})
      })
  }
  handleSubmit(event) {
    event.preventDefault();
    var roleIds = [];
    this
      .state
      .selectedRoles
      .map((role) => (roleIds.push(role.value)));
    var payload = {
      id: this.props.match.params.id,
      name: this.state.name,
      roleIds: roleIds
    };
    this
      .props
      .actions
      .updateGroup(payload, this.props.match.params.id);
  }
  renderGroupName() {
    return (<TextField value={this.state.name} floatingLabelText="Group Name" onChange={this.handleGroupChange} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>);
  }
  renderRoleList(selectedRoles, roleNodes) {
    return (
      <SelectField name='selectedRoles' hintText='' floatingLabel='Role' value={selectedRoles} onChange={this.handleRoleChange} fullWidth={true} maxHeight={200} floatingLabelFocusStyle={floatingLabelFocusStyle} underlineFocusStyle={underlineFocusStyle} multiple checkPosition='right' style={selectContainerStyle} selectionsRenderer={(values, hintText) => selectionsRenderer(values, hintText)}>
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
        .push('/groups', {state: 'state'});
      toastr.success('Group updated successfully');
    }
  }
  render() {
    const {selectedRoles, roleNodes} = this.state;
    return (
      <div>
        <section class="content-header">
          <h4>
            Groups
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="/">
                <i class="fa fa-home"></i>
                Home
              </a>
            </li>
            <li class="active">
              {this.groupsLinks()}
            </li>
            <li class="active">
              <a href="#">Edit Group</a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="card">
            <h4 class="card-title">Edit Role</h4>
            <div class="card-body">
              <MuiThemeProvider>
                <form>
                  {this.renderGroupName()}
                  {this.renderRoleList(selectedRoles, roleNodes)}
                  <div class="row">
                    <div class="col-md-4 col-md-offset-4 scan-now-btn">
                      <FormGroup class="sign-in-form-group">
                        <Button block bsSize="large" class="btn btn-success signup-button" type="submit" onClick={this.handleSubmit}>
                          Save
                        </Button>
                      </FormGroup>
                    </div>
                  </div>
                </form>
              </MuiThemeProvider>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({updateResponse: state.groups.updateResponse});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(groupActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Edit)
