import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as scanTypeActions from '../../Actions/ScanTypeActions'
import {TextValidator} from 'react-material-ui-form-validator'
import {ValidatorForm} from 'react-form-validator-core'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {underlineFocusStyle, floatingLabelFocusStyle,} from '../CSSModules'
import {toastr} from 'react-redux-toastr'
import {Link} from 'react-router-dom'

const requiredValidation = () => ['required'];
const errorMessage = () => ['this field is required'];

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  onChangeScanType = (event, name) => this.setState({name});

  renderScanTypesLink() {
    return (
      <Link to="/scan_types">
        Scan Types
      </Link>
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    var payload = {
      name: this.state.name
    };
    this
      .props
      .actions
      .createScanType(payload);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createResponse) {
      this
        .context
        .router
        .history
        .push('/scan_types', {state: 'state'});
      toastr.success('Scantype created successfully');
    }
    if (nextProps.error) {
      toastr.error(nextProps.error.data.message);
    }
  }
  render() {
    return (
      <div class="page-wrapper">
        <section class="content-header">
          <h4>
            Scan Types
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="/">
                <i class="fa fa-home"></i>
                Home
              </a>
            </li>
            <li class="active">
              <a href="#">
                <i class="fa fa-cog"></i>
                Settings
              </a>
            </li>
            <li class="active">
              {this.renderScanTypesLink()}
            </li>
            <li class="active">
              <a href="#">Create Scan Type</a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="card">
            <h4 class="card-title">Add scan type</h4>
            <div class="card-body">
              <MuiThemeProvider>
                <ValidatorForm onSubmit={this.handleSubmit}>

                  <TextValidator validators={requiredValidation()} errorMessages={errorMessage()} name="name" floatingLabelText="Scan Type" onChange={this.onChangeScanType} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} value={this.state.name}/>

                  <button class="btn btn-primary form-page-btn" type="submit">
                    Save Details
                  </button>
                </ValidatorForm>
              </MuiThemeProvider>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(scanTypeActions, dispatch)
});
const mapStateToProps = (state) => ({createResponse: state.scanTypes.createResponse, error: state.scanTypes.error});
export default connect(mapStateToProps, mapDispatchToProps)(Create)
