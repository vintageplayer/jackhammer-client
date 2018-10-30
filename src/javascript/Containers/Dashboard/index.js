import React, {Component} from 'react'
import TopNabar from '../Common/TopNavbar'
import Breadcrumb from '../Common/Breadcrumb'
import Layout from '../../Components/Layout'
import View from './View'
import {connect} from 'react-redux'
import '../../../stylesheets/style.css'

class Dashboarb extends Component {
  render() {
    const {ownerType, scanType,} = this.props.match.params;
    const {currentOwnerType, currentScanType,} = this.props;
    return (
      <div class="page-wrapper">
        <TopNabar scanType={scanType} ownerType={ownerType} page="dashboard"/>
        <Breadcrumb scanType={currentScanType} ownerType={currentOwnerType} page="dashboard" iconClass="fa fa-dashboard"/>
        <section class="content">
          <View scanType={scanType} ownerType={ownerType}/>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({currentOwnerType: state.dashboard.currentOwnerType, currentScanType: state.dashboard.currentScanType});
export default connect(mapStateToProps)(Dashboarb);
