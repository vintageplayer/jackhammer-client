import React, {Component} from 'react'
import List from './List'

export default class Users extends Component {
  render() {
    return (
      <div>
        <section class="content-header">
          <h1>
            Users
          </h1>
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
              Users
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
