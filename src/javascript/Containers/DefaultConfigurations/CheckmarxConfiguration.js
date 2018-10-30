import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import {underlineFocusStyle, floatingLabelFocusStyle, selectContainerStyle} from '../CSSModules'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class CheckmarxConfiguration extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <form>
          <TextField floatingLabelText="Server" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>
          <TextField floatingLabelText="UserName" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>
          <TextField type="password" floatingLabelText="Password" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>
          <TextField floatingLabelText="Checkmarx log file" fullWidth={true} underlineFocusStyle={underlineFocusStyle} floatingLabelFocusStyle={floatingLabelFocusStyle}/>
          <button class="btn btn-primary form-page-btn" type="submit">Save Details</button>
        </form>
      </MuiThemeProvider>
    )
  }
}
