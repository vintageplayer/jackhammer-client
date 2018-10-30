import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Breadcrumb extends Component {
  applicationLink(currentGroup, currentOwnerType, currentScanType) {
    if (currentGroup === null)
      return null;
    return (
      <li>
        <Link to={"/applications/" + currentOwnerType + "/" + currentScanType}>
          <i class="fa fa-tasks"></i>
          Applications
        </Link>
      </li>
    )
  }
  groupLink(currentGroup) {
    if (currentGroup) {
      return (
        <li>
          <a href="#">
            <i class="fa fa-users"></i>
            {currentGroup.name}
          </a>
        </li>
      )
    }
  }
  render() {
    const {group, ownerType, scanType,} = this.props;
    return (
      <section class="content-header">
        <h4>
          Repos
        </h4>
        <ul class="breadcrumb">
          <li>
            <a href="/">
              <i class="fa fa-home"></i>
              Home
            </a>
          </li>
          {this.applicationLink(group, ownerType, scanType)}
          {this.groupLink(group, ownerType, scanType)}
          <li class="active">
            Repos
          </li>
        </ul>
      </section>
    )
  }
}
const mapStateToProps = (state) => ({group: state.repos.currentGroup});
export default connect(mapStateToProps)(Breadcrumb);
