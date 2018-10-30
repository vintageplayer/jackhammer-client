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
    const {
      ownerType,
      scanType,
      group,
      repoId,
      currentGroup,
      currentRepo,
    } = this.props;
    return (
      <section class="content-header">
        <h4>
          {this.props.pageTitle}
        </h4>
        <ul class="breadcrumb">
          <li>
            <a href="/">
              <i class="fa fa-home"></i>
              Home
            </a>
          </li>
          {this.applicationsLink(ownerType, scanType)}
          {this.reposLink(ownerType, scanType, group)}
          <li class="active">
            {this.props.pageTitle}
          </li>
        </ul>
      </section>
    )
  }
}
