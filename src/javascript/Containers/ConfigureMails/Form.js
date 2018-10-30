import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import * as severityLevelActions from '../../Actions/SeverityLevelActions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle,} from '../CSSModules'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {axiosInstance} from '../../Config/AxiosInstance'
import {toastr} from 'react-redux-toastr'
import {ValidatorForm} from 'react-form-validator-core'

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      severityLevels: {
        critical: {
          count: '',
          mails: ''
        },
        high: {
          count: '',
          mails: ''
        },
        medium: {
          count: '',
          mails: ''
        },
        low: {
          count: '',
          mails: ''
        },
        info: {
          count: '',
          mails: ''
        },
      }
    };
    this.handleSeverityChange = this
      .handleSeverityChange
      .bind(this)
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  componentDidMount() {
    this
      .props
      .actions
      .fetch();
  }

  titleCase(string) {
    return string
      .charAt(0)
      .toUpperCase() + string.slice(1);
  }

  handleSeverityChange(event) {
    let severityLevels = this.state.severityLevels;
    var severity = event
      .target
      .name
      .split('_');
    if (severity[1] === 'count') {
      severityLevels[severity[0]]['count'] = event.target.value;
    } else {
      severityLevels[severity[0]]['mails'] = event.target.value;
    }
    this.setState({severityLevels: severityLevels});
  }

  handleSubmit(event) {
    event.preventDefault();
    var payload = {
      notificationMailsConfiguration: this.state.severityLevels,
      requestFromNotificationMail: true,
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
          var severityName = severityLevel
            .name
            .toLowerCase();
          severityLevels[severityName] = {
            count: severityLevel.threshHoldCount,
            mails: severityLevel.mailIds,
          };
        });
      this.setState({severityLevels: severityLevels});
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
    return (
      <MuiThemeProvider>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <div class='col-xs-6'>
            <TextField name="critical_count" value={this.state.severityLevels.critical.count} floatingLabelText="Critical count greater than " fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSeverityChange}/>
          </div>
          <div class='col-xs-6'>
            <TextField name="critical_mails" value={this.state.severityLevels.critical.mails} floatingLabelText="Mail ids separted with comma ',' " fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSeverityChange}/>
          </div>
          <div class='col-xs-6'>
            <TextField name="high_count" value={this.state.severityLevels.high.count} floatingLabelText="High count greater than" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSeverityChange}/>
          </div>
          <div class='col-xs-6'>
            <TextField name="high_mails" value={this.state.severityLevels.high.mails} floatingLabelText="Mail ids separted with comma ',' " fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSeverityChange}/>
          </div>
          <div class='col-xs-6'>
            <TextField name="medium_count" value={this.state.severityLevels.medium.count} floatingLabelText="Medium count greater than" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSeverityChange}/>
          </div>
          <div class='col-xs-6'>
            <TextField name="medium_mails" value={this.state.severityLevels.medium.mails} floatingLabelText="Mail ids separted with comma ',' " fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSeverityChange}/>
          </div>

          <div class='col-xs-6'>
            <TextField name="low_count" value={this.state.severityLevels.low.count} floatingLabelText="Low count greater than" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSeverityChange}/>
          </div>
          <div class='col-xs-6'>
            <TextField name="low_mails" value={this.state.severityLevels.low.mails} floatingLabelText="Mail ids separted with comma ',' " fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSeverityChange}/>
          </div>
          <div class='col-xs-6'>
            <TextField name="info_count" value={this.state.severityLevels.info.count} floatingLabelText="Info count greater than " fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSeverityChange}/>
          </div>
          <div class='col-xs-6'>
            <TextField name="info_mails" value={this.state.severityLevels.info.mails} floatingLabelText="Mail ids separted with comma ',' " fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle} onChange={this.handleSeverityChange}/>
          </div>
          <div class='col-xs-6'>
            <button class="btn form-page-btn btn-primary" type="submit">
              Save Details
            </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Form)
