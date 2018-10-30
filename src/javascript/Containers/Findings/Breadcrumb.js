import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Breadcrumb extends Component {
  applicationsLink(ownerType, scanType, group, repo) {
    if (group === null)
      return null;
    return (
      <li>
        <Link to={"/applications/" + ownerType + "/" + scanType}>
          <i class="fa fa-tasks"></i>
          Applications
        </Link>
      </li>
    )
  }
  reposLink(ownerType, scanType, group) {
    if (group === null)
      return null;
    if (group) {
      return (
        <li>
          <Link to={"/repos/" + ownerType + "/" + scanType + "/" + group}>
            <i class="fa fa-tasks"></i>
            Repos
          </Link>
        </li>
      )
    }
  }
  render() {
    return (
      <section class="content-header">
        <h4>Finding Details</h4>
        <ol class="breadcrumb">
          <li>
            <a href="#">
              <i class="fa fa-dashboard"></i>
              Home
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-dashboard"></i>
              scans
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-dashboard"></i>
              Findings
            </a>
          </li>
          <li class="active">
            <a href="#">Finding Details</a>
          </li>
        </ol>
      </section>
    )
  }
}
