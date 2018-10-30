import React, {Component} from 'react'
import TopNabar from '../Common/TopNavbar'
import FilterList from './FilterList'
import Breadcrumb from '../Common/Breadcrumb'
import {connect} from 'react-redux'

class Index extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  render() {
    const {ownerType, scanType,} = this.props.match.params;
    const {currentOwnerType, currentScanType} = this.props;
    var searchParams = new URLSearchParams(this.context.router.history.location.search);
    var severity = searchParams.get("severity");
    var vulnerableType = searchParams.get("vulnerableType");
    return (
      <div class="page-wrapper">
        <div class="page-wrapper">
          <TopNabar scanType={scanType} ownerType={ownerType} page="filters"/>
          <Breadcrumb scanType={currentScanType} ownerType={currentOwnerType} severity={severity} vulnerableType={vulnerableType} page="filters" iconClass="fa fa-filter"/>
          <FilterList scanType={scanType} ownerType={ownerType} severity={severity} vulnerableType={vulnerableType}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({currentScanType: state.filters.currentScanType, currentOwnerType: state.filters.currentOwnerType,});
export default connect(mapStateToProps)(Index);
