import React, {Component} from 'react'
import * as scanTypeActions from '../../Actions/ScanTypeActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'

class TopNabar extends Component {
  componentWillMount() {
    this
      .props
      .actions
      .fetchAllScanTypes({limit: -1});
  }
  getListClass(currentscanType) {
    const {scanType} = this.props;
    if (currentscanType.id === parseInt(scanType))
      return "nav-item active"
    return "nav-item"
  }
  getScanLandingPage(ownerType, scanType) {
    var url = "/scans/" + ownerType;
    return url;
  }
  renderScanTypes(scanTypes, ownerType) {
    if (scanTypes.length === 0)
      return null;
    return scanTypes.map((scanType, index) => <li key={index} class={this.getListClass(scanType)}>
      <Link class="nav-link" to={"/scans/" + ownerType + "/" + scanType.id}>
        {scanType.name}
      </Link>
    </li>)
  }
  render() {
    const {fetchedScanTypes} = this.props;
    const {ownerType} = this.props;
    return (
      <div class="row hdr-nav-bar">
        <div class="col-md-12">
          <nav class="navbar navbar-expand-lg navbar-light">
            <div class="collapse navbar-collapse">
              <ul class="navbar-nav mr-auto" role="tablist">
                {this.renderScanTypes(fetchedScanTypes, ownerType)}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(scanTypeActions, dispatch)
});
const mapStateToProps = (state) => ({fetchedScanTypes: state.scanTypes.fetchedScanTypes});
export default connect(mapStateToProps, mapDispatchToProps)(TopNabar);
