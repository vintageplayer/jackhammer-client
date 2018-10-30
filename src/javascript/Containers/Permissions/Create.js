import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as permissionActions from '../../Actions/PermissionActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, FormGroup} from 'react-bootstrap'
import {underlineFocusStyle, floatingLabelFocusStyle} from '../CSSModules'
import {toastr} from 'react-redux-toastr'

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.onChangePermission = this
      .onChangePermission
      .bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  onChangePermission = (event, name) => this.setState({name});

  handleSubmit(event) {
    event.preventDefault();
    var payload = {
      'name': this.state.name
    };
    this
      .props
      .actions
      .createPermission(payload);
  }
  renderPermissionName() {
    return (<TextField floatingLabelText="Permission Name" onChange={this.onChangePermission} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.createResponse) {
      this
        .context
        .router
        .history
        .push('/permissions', {state: 'state'});
      toastr.success('Permission created successfully');
    }
  }
  render() {
    return (
      <div class="page-wrapper">
        <section class="content-header">
          <h4>
            Permissions
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="#">
                <i class="fa fa-dashboard"></i>
                Home</a>
            </li>
            <li class="active">
              <a href="#">Permissions</a>
            </li>
            <li class="active">
              <a href="#">Create Permission</a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="card">
            <h4 class="card-title">Add New Permission</h4>
            <div class="card-body">
              <MuiThemeProvider>
                <form>
                  <div class="row">
                    <div class="col-xs-12">
                      {this.renderPermissionName()}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4 col-md-offset-4 scan-now-btn">
                      <FormGroup>
                        <Button class="btn-block btn-lg btn-primary" onClick={this.handleSubmit}>
                          Save Permission
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
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(permissionActions, dispatch)
});
const mapStateToProps = (state) => ({createResponse: state.permissions.createResponse});
export default connect(mapStateToProps, mapDispatchToProps)(Create)
