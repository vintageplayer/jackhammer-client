import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as scanTypeActions from '../../Actions/ScanTypeActions'
import {TextValidator} from 'react-material-ui-form-validator'
import {ValidatorForm} from 'react-form-validator-core'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {underlineFocusStyle, floatingLabelFocusStyle,} from '../CSSModules'
import {axiosInstance} from '../../Config/AxiosInstance'
import {toastr} from 'react-redux-toastr'
import {Link} from 'react-router-dom'

const requiredValidation = () => ['required'];
const errorMessage = () => ['this field is required'];

class Edit extends Component {
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

  componentDidMount() {
    axiosInstance
      .get("/scan_types/" + parseInt(this.props.match.params.id))
      .then(response => {
        this.setState({name: response.data.name})
      })
  }
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
      id: this.props.match.params.id,
      name: this.state.name,
    };
    this
      .props
      .actions
      .updateScanType(payload, parseInt(this.props.match.params.id));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.updateResponse) {
      this
        .context
        .router
        .history
        .push('/scan_types/2', {state: 'state'});
      toastr.success('Scantype updated successfully');
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
            Scantypes
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="/">
                <i class="fa fa-home"></i>
                Home
              </a>
            </li>
            <li class="active">
              {this.renderScanTypesLink()}
            </li>
            <li class="active">
              <a href="#">Edit Scantype</a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="card">
            <h4 class="card-title">Edit Scantype</h4>
            <div class="card-body">
              <MuiThemeProvider>
                <ValidatorForm onSubmit={this.handleSubmit}>

                  <TextValidator name="name" validators={requiredValidation()} errorMessages={errorMessage()} value={this.state.name} floatingLabelText="Scantype" onChange={this.onChangeScanType} fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>

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
const mapStateToProps = (state) => ({updateResponse: state.scanTypes.updateResponse, error: state.scanTypes.error});
export default connect(mapStateToProps, mapDispatchToProps)(Edit)
