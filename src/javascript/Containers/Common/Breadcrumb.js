import React, {Component} from 'react'

export default class Breadcrumb extends Component {
  getPageTitle(page) {
    var pageTitle = page
      .charAt(0)
      .toUpperCase() + page.slice(1);
    return pageTitle;
  }
  renderOwnerType(ownerType) {
    if (ownerType == null)
      return ownerType;
    return ownerType.name;
  }

  renderScanType(scanType, severity, vulnerableType) {
    if ((severity || vulnerableType) && scanType === null)
      return (
        <li class="active">All Scan Types</li>
      );
    if (scanType == null)
      return scanType;
    return (
      <li class="active">{scanType.name}</li>
    );
  }
  render() {
    const {
      page,
      ownerType,
      scanType,
      iconClass,
      severity,
      vulnerableType,
    } = this.props;
    return (
      <section class="content-header">
        <h4>
          {this.getPageTitle(page)}
        </h4>
        <ul class="breadcrumb">
          <li>
            <a href="/">
              <i class="fa fa-home"></i>Home</a>
          </li>
          <li>
            <a href="#">
              <i class={iconClass}></i>{this.getPageTitle(page)}</a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-user"></i>{this.renderOwnerType(ownerType)}</a>
          </li>
          {this.renderScanType(scanType, severity, vulnerableType)
          }
        </ul>
      </section>
    )
  }
}
