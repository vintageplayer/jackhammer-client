import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import * as permissionActions from '../../Actions/PermissionActions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {Button, FormGroup,} from 'react-bootstrap'
import {underlineFocusStyle, floatingLabelFocusStyle,} from '../CSSModules'
import {axiosInstance} from '../../Config/AxiosInstance'
import {toastr} from 'react-redux-toastr'

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      permissionRecordId: this.props.match.params.id,
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

  componentDidMount() {
    axiosInstance
      .get("/permissions/" + this.state.permissionRecordId)
      .then(response => {
        this.setState({name: response.data.name})
      })
  }
  onChangePermission = (event, name) => this.setState({name});
  handleSubmit(event) {
    event.preventDefault();
    var payload = {
      'name': this.state.name,
      'id': this.state.permissionRecordId,
    };
    this
      .props
      .actions
      .updatePermission(payload, this.state.permissionRecordId);
    this.setState({redirect: true});
  }
  renderPermissionName() {
    return (<TextField value={this.state.name} floatingLabelText="Permission Name" onChange={this.onChangePermission} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.updateResponse) {
      this
        .context
        .router
        .history
        .push('/permissions', {state: 'state'});
      toastr.success('Permission updated successfully');
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
                Home
              </a>
            </li>
            <li class="active">
              <a href="#">Permissions</a>
            </li>
            <li class="active">
              <a href="#">Edit Permission</a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="card">
            <h4 class="card-title">Edit Permission</h4>
            <div class="box-body">
              <MuiThemeProvider>
                <form>
                  {this.renderPermissionName()}
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
const mapStateToProps = (state) => ({updateResponse: state.permissions.updateResponse});
export default connect(mapStateToProps, mapDispatchToProps)(Edit)
