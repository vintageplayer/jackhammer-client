import React, {Component} from 'react'
import List from './List'
import '../../../stylesheets/users-roles.css'

export default class Groups extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  handleClick() {
    this
      .context
      .router
      .history
      .push("/add_group", {state: 'state'});
  }

  render() {
    return (
      <div class="page-wrapper">
        <section class="content-header">
          <h4>
            Groups
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="/">
                <i class="fa fa-home"></i>
                Home
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-users"></i>
                RBAC
              </a>
            </li>
            <li class="active">
              <a href="#">Groups</a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="card">
                <div class="card-body">
                  <List/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
