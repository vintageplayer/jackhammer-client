import React, {Component} from 'react'
import Checkbox from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as severityLevelActions from '../../Actions/SeverityLevelActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {axiosInstance} from '../../Config/AxiosInstance'
import {toastr} from 'react-redux-toastr'

import {ValidatorForm} from 'react-form-validator-core'

class SeverityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeverities: {}
    };
    this.handleSeverityChange = this
      .handleSeverityChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this)
  }
  componentDidMount() {
    this
      .props
      .actions
      .fetch();
  }
  handleSeverityChange(event) {
    var {selectedSeverities} = this.state;
    selectedSeverities[event.target.id] = event.target.checked;
    this.setState({selectedSeverities: selectedSeverities})
  }

  renderSevirityLevels(fetchedSeverityLevels) {
    if (fetchedSeverityLevels == null)
      return;
    return (
      <div class='row'>
        {fetchedSeverityLevels.map((severityLevel, index) => <div key={index} class='col-xs-6'>
          <div class="checkbox checkbox-slider--b-flat ">
            <label>
              <input id={severityLevel.id} type="checkbox" onChange={this.handleSeverityChange} checked={this.state.selectedSeverities[severityLevel.id]}/>
              <span>{severityLevel.name}</span>
            </label>
          </div>
        </div>)
}
      </div>
    )
  }
  handleSubmit(event) {
    event.preventDefault();
    var payload = {
      severitiesStatus: this.state.selectedSeverities
    }
    this
      .props
      .actions
      .update(1, payload)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.fetchedSeverityLevels.length > 0) {
      let severityLevels = {};
      nextProps
        .fetchedSeverityLevels
        .map(function(severityLevel) {
          severityLevels[severityLevel.id] = severityLevel.enabled;
        });
      this.setState({selectedSeverities: severityLevels});
    }
    if (nextProps.updateResponse) {
      toastr.success('Severity levels are  updated successfully');
      this
        .props
        .actions
        .fetch();
    }
  }
  render() {
    const {fetchedSeverityLevels} = this.props;
    return (
      <MuiThemeProvider>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <div class='row'>
            {this.renderSevirityLevels(fetchedSeverityLevels)}
          </div>
          <div class='row'>
            <div class='col-md-6'>
              <button class="btn btn-primary form-page-btn" type="submit">
                Save
              </button>
            </div>
          </div>
        </ValidatorForm>
      </MuiThemeProvider>
    )
  }
}
const mapStateToProps = (state) => ({fetchedSeverityLevels: state.severityLevels.severityLevels, updateResponse: state.severityLevels.updateResponse,});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(severityLevelActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(SeverityForm)
