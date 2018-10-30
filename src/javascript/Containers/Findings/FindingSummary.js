import React, {Component} from 'react'
import {fetchFinding} from '../../Actions/FindingActions'
import {connect} from 'react-redux'

class FindingSummary extends Component {
  componentDidMount() {
    var repoPage = this.props.sourcePage === 'repo'
      ? true
      : false
    this
      .props
      .dispatch(fetchFinding(this.props.findingId, repoPage));
  }
  renderSummary(finding) {
    if (finding === null)
      return null;
    return (
      <div>
        <div class="row">
          <div class="col-xs-2">
            <strong>Application Name:</strong>
          </div>
          <div class="col-xs-10">
            {finding.applicationName}
          </div>
        </div>
        <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Tool Name:</strong>
          </div>
          <div class="col-xs-10">
            {finding.toolName}
          </div>
        </div>
        <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Repo/Url/Apk:</strong>
          </div>
          <div class="col-xs-10">
            <a href={finding.repoUrl} target="_blank">
              {finding.repoUrl}
            </a>
          </div>
        </div>
        <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Bug Type:</strong>
          </div>
          <div class="col-xs-10">
            {finding.name}
          </div>
        </div>
        {finding.description != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Description:</strong>
          </div>
          <div class="col-xs-10">
            {finding.description}
          </div>
        </div>
}
        {finding.solution != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Remediation:</strong>
          </div>
          <div class="col-xs-10">
            {finding.solution}
          </div>
        </div>
}
        {finding.userInput != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>User Input:</strong>
          </div>
          <div class="col-xs-10">
            {finding.userInput}
          </div>
        </div>
}
        {finding.fileName != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>File Name:</strong>
          </div>
          <div class="col-xs-10">
            {finding.fileName}
          </div>
        </div>
}
        {finding.lineNumber != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Line No:</strong>
          </div>
          <div class="col-xs-10">
            {finding.lineNumber}
          </div>
        </div>
}
        {finding.code != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Code:</strong>
          </div>
          <div class="col-xs-10">
            <pre>{finding.code}</pre>
          </div>
        </div>
}
        {finding.cvssScore != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>CVSS Score:</strong>
          </div>
          <div class="col-xs-10">
            {finding.cvssScore}
          </div>
        </div>
}
        {finding.externalLink != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>External Link:</strong>
          </div>
          <div class="col-xs-10">
            {finding.externalLink}
          </div>
        </div>
}
        {finding.fingerprint != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Fingerprint:</strong>
          </div>
          <div class="col-xs-10">
            {finding.fingerprint}
          </div>
        </div>
}
        {finding.host != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Host:</strong>
          </div>
          <div class="col-xs-10">
            {finding.host}
          </div>
        </div>
}
        {finding.protocal != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Protocol:</strong>
          </div>
          <div class="col-xs-10">
            {finding.protocal}
          </div>
        </div>
}
        {finding.state != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>State:</strong>
          </div>
          <div class="col-xs-10">
            {finding.state}
          </div>
        </div>
}
        {finding.port != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Port:</strong>
          </div>
          <div class="col-xs-10">
            {finding.port}
          </div>
        </div>
}
        {finding.product != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Product:</strong>
          </div>
          <div class="col-xs-10">
            {finding.product}
          </div>
        </div>
}
        {finding.version != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Version:</strong>
          </div>
          <div class="col-xs-10">
            {finding.version}
          </div>
        </div>
}
        {finding.scripts != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Scripts:</strong>
          </div>
          <div class="col-xs-10">
            {finding.scripts}
          </div>
        </div>
}
        {finding.request != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Request:</strong>
          </div>
          <div class="col-xs-10">
            {finding.request}
          </div>
        </div>
}
        {finding.response != null && <div class="row top-buffer">
          <div class="col-xs-2">
            <strong>Response:</strong>
          </div>
          <div class="col-xs-10">
            {finding.response}
          </div>
        </div>
}
      </div>
    );
  }

  render() {
    const {finding} = this.props
    const paginationRecord = this.props.fetchedFindings && this.props.fetchedFindings.length > 0
      ? this.props.fetchedFindings[0]
      : finding
    if (paginationRecord != null) {
      return (
        <div class="finding-sumary">
          {this.renderSummary(paginationRecord)}
        </div>
      );
    } else {
      return (
        <div class="finding-sumary">
          <h3>
            Finding details could not fetch
          </h3>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({finding: state.findings.finding, fetchedFindings: state.findings.fetchedFindings,});

export default connect(mapStateToProps)(FindingSummary);
