import React, {Component} from 'react'
import * as scanTypeActions from '../../Actions/ScanTypeActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'

class TopNabar extends Component {
  componentWillMount() {
    const {ownerType, scanType,} = this.props;
    var payload = {
      limit: -1
    };
    if (ownerType != null)
      payload['ownerTypeId'] = ownerType;
    if (scanType != null)
      payload['scanTypeId'] = scanType;
    if (this.props.auth.authenticated) {
      this
        .props
        .actions
        .fetchAllScanTypes(payload);
    }
  }
  getListClass(currentscanType) {
    const {scanType} = this.props;
    if (currentscanType.id === parseInt(scanType))
      return "nav-item active"
    return "nav-item"
  }

  renderScanTypes(scanTypes, ownerType, page) {
    if (scanTypes.length === 0)
      return null;
    return scanTypes.map((scanType, index) => <li key={index} class={this.getListClass(scanType)}>
      <Link class="nav-link" to={"/" + page + "/" + ownerType + "/" + scanType.id}>
        {scanType.name}
      </Link>
    </li>)
  }
  render() {
    const {fetchedScanTypes, ownerType, page} = this.props;
    return (
      <div class="row hdr-nav-bar">
        <div class="col-md-12">
          <nav class="navbar navbar-expand-lg navbar-light">
            <div class="collapse navbar-collapse">
              <ul class="navbar-nav mr-auto" role="tablist">
                {this.renderScanTypes(fetchedScanTypes, ownerType, page)}
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
const mapStateToProps = (state) => ({fetchedScanTypes: state.scanTypes.fetchedScanTypes, auth: state.auth,});
export default connect(mapStateToProps, mapDispatchToProps)(TopNabar);
