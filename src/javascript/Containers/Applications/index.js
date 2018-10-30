import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TopNabar from '../Common/TopNavbar'
import Breadcrumb from '../Common/Breadcrumb'
import List from './List'
import {connect} from 'react-redux'

class Applications extends Component {
  render() {
    const {ownerType, scanType,} = this.props.match.params;
    const {currentOwnerType, currentScanType,} = this.props;
    return (
      <div class="page-wrapper">
        <TopNabar scanType={scanType} ownerType={ownerType} page="applications"/>
        <Breadcrumb scanType={currentScanType} ownerType={currentOwnerType} page="applications" iconClass="fa fa-tasks"/>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="card">
                <div class="card-body">
                  <List scanType={scanType} ownerType={ownerType}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({currentOwnerType: state.applications.currentOwnerType, currentScanType: state.applications.currentScanType});
export default connect(mapStateToProps)(Applications);
