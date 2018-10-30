import React, {Component} from 'react'
import List from './List';
import '../../../stylesheets/users-roles.css'

export default class Roles extends Component {
  render() {
    return (
      <div>
        <section class="content-header">
          <h4>
            Roles
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
              <a href="#">Roles</a>
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
