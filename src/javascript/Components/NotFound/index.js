import React, {Component} from 'react'
export default class Index extends Component {
  render() {
    var dialogStyles = {
      color: '#2E2F30',
      textAlign: 'center',
      fontFamily: 'Dosis',
      margin: 0,
      width: '95%',
      maxWidth: '45em',
      margin: '4em auto 0',
    }
    var dialogContentStyles = {
      border: '1px solid #CCC',
      borderRightColor: '#999',
      borderLeftColor: '#999',
      borderBottomColor: '#BBB',
      borderTop: '#B00100 solid 4px',
      borderTopLeftRadius: '9px',
      borderTopRightRadius: '9px',
      backgroundColor: 'white',
      padding: '7px 12% 0',
      boxShadow: '0 3px 8px rgba(50, 50, 50, 0.17)',
    }
    var titleStyles = {
      fontSize: '100%',
      color: '#730E15',
      lineHeight: '1.5em'
    }
    var paragraphStyles = {
      margin: '0 0 1em',
      padding: '1em',
      backgroundColor: '#F7F7F7',
      border: '1px solid #CCC',
      borderRightColor: '#999',
      borderLeftColor: '#999',
      borderBottomColor: '#999',
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px',
      borderTopColor: '#DADADA',
      color: '#666',
      boxShadow: '0 3px 8px rgba(50, 50, 50, 0.17)'
    }
    return (
      <div style={dialogStyles}>
        <h1 style={titleStyles}>The page you were looking for doesn't exist (404)</h1>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <div style={dialogContentStyles}>
          <h2 style={titleStyles}>The page you were looking for doesn't exist.</h2>
          <p>You may have mistyped the address or the page may have moved.</p>
        </div>
        <p style={paragraphStyles}>If you are the application owner check the logs for more information.</p>
      </div>
    );
  }
}
